const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const User = require("../models/User");

// NOTES

// A resolver can optionally accept four positional arguments: (parent, args, context, info).

const resolvers = {
  // query
  Query: {
    //   pass in parent, args and context as params
    me: async (parent, args, context) => {
      // note - we get context.user using authMiddleware
      if (context.user) {
        //   find a specific user
        const userData = await User.findOne({
          // where that users ID is = to the context.users ID
          _id: context.user._id,
        })
          .select("-__v -password")
          //   populate books
          .populate("books");

        return userData;
      }
      throw new AuthenticationError("Please log in!");
    },
  },
  Mutation: {
    //   Login User - destructuring email and password from 'args'
    login: async (parent, { email, password }) => {
      // find the user by their email
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      //   check to see if password is correct
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      //   if email && pass are correct signToken with that specific users information
      const token = signToken(user);

      return { token, user };
    },
  },
  // Create a user
  addUser: async (parent, args) => {
    try {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    } catch (error) {
      console.log(user);
    }
  },
  //   Save a book
  saveBook: async (parent, args, context) => {
    if (context.user) {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: args.input } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    } else {
      throw new AuthenticationError("Please log in");
    }
  },
  //   delete book
  deleteBook: async (parent, args, context) => {
    if (context.user) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      );

      return updatedUser;
    }

    throw new AuthenticationError("You need to be logged in!");
  },
};

module.exports = resolvers;

// remove a book from `savedBooks`
//   async deleteBook({ user, params }, res) {
//     const updatedUser = await User.findOneAndUpdate(
//       { _id: user._id },
//       { $pull: { savedBooks: { bookId: params.bookId } } },
//       { new: true }
//     );
//     if (!updatedUser) {
//       return res.status(404).json({ message: "Couldn't find user with this id!" });
//     }
//     return res.json(updatedUser);
//   },
