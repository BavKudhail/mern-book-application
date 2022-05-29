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
  type Book {
      bookId: String!
      authors: [String]
      description: String
      title: String
      image: String
      link: String
  }
`;

module.exports = typeDefs;


		// * `Book` type:

		// 	* `bookId` (Not the `_id`, but the book's `id` value returned from Google's Book API.)

		// 	* `authors` (An array of strings, as there may be more than one author.)

		// 	* `description`

		// 	* `title`

		// 	* `image`

		// 	* `link`
