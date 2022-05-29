const { gql } = require("apollo-server-express");
// Notes:
// a trailing ! = Not Null

const typeDefs = gql`
  type Mutation {
    # Accepts an email and password as parameters; returns an Auth type.
    login(email: String!, password: String!): Auth
    # Accepts a username, email, and password as parameters; returns an Auth type
    addUser(username: String!, email: String!, password: String!): Auth
    # Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type.
    saveBook(bookData: BookInput): User
    # removeBook: Accepts a book's bookId as a parameter; returns a User type
    removeBook(bookId: ID!): User
  }
  type User {
    _id: ID!
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Query {
    me: User
  }
`;

module.exports = typeDefs;

//  `User` type:

// 			* `_id`

// 			* `username`

// 			* `email`

// 			* `bookCount`

// 			* `savedBooks` (This will be an array of the `Book` type.)
