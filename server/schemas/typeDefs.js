const { gql } = require("apollo-server-express");

const typeDefs = gql`
type Query {

}
type Mutation {
    # Accepts an email and password as parameters; returns an Auth type.
    login(email: String!, password: String!): Auth
    # Accepts a username, email, and password as parameters; returns an Auth type
    addUser(username: String!, email: String!, password: String! ): Auth
    # Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type.
    saveBook(bookData: BookInput): User
    # removeBook: Accepts a book's bookId as a parameter; returns a User type
    removeBook(bookId: ID!): User
 

}

`;

module.exports = typeDefs;

// * `Mutation` type:

// 			* `login`: Accepts an email and password as parameters; returns an `Auth` type.

// 			* `addUser`: Accepts a username, email, and password as parameters; returns an `Auth` type.

// 			* `saveBook`: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a `User` type. (Look into creating what's known as an `input` type to handle all of these parameters!)

// 			* `removeBook`: Accepts a book's `bookId` as a parameter; returns a `User` type.
