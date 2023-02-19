// import the gql tagged template function, an advanced use of template literals
// introduced in ES6 JS.
const { gql } = require(`apollo-server-express`);

// create our typeDefs, define query with type Query {} named "helloWorld" with
// type. Set up resolvers in js file.

// we're instructing our query that we'll return an array, as noted by the []
// square brackets around the returning data, Thought.

// defined our thoughts query that it could receive a parameter if we wanted.
// In this case, the parameter would be identified as username and would have
// a String data type. Query with or without username param

// four queries defined: two for thoughts, and two for users.
// exclamation point ! after the query parameter data type definitions indicates
// that data must exist, otherwise, Apollo will return an error to the client.
// without !, query will return all.

// two mutations: a login() mutation and an addUser() mutation. Both will return
// a User object: either the user who successfully logged in or the user who was
// just created on sign-up.

// This means that an Auth type must return a token and can optionally include any
// other user data. Updated two mutations to return an Auth object instead of a User object.
const typeDefs = gql`
  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }

  type Auth {
    token: ID!
    user: User
  }
`;

//export the typeDefs
module.exports = typeDefs;
