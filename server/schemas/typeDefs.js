// import the gql tagged template function, an advanced use of template literals
// introduced in ES6 JS.
const { gql } = require(`apollo-server-express`);

// create our typeDefs, define query with type Query {} named "helloWorld" with
// type. Set up resolvers in js file.
const typeDefs = gql`
  type Query {
    helloWorld: String
  }
`;

//export the typeDefs
module.exports = typeDefs;
