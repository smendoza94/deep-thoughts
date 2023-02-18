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

  type Query {
    thoughts(username: String): [Thought]
  }
`;

//export the typeDefs
module.exports = typeDefs;
