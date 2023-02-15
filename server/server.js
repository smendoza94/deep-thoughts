const express = require("express");
//import ApolloServer
const { ApolloServer } = require("apollo-server-express");

// import typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
// create a new Apollo Server amd pass in our schema data
// With the new ApolloServer() function, we provide the type definitions
// and resolvers so they know what our API looks like and how it resolves
// requests. There are more parameters we could pass in, but these are the
// two we really need to get started.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create a new instance of an Apollo Server with the GraphQL Schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // integrate our Apollo Server with the Express application as middleware
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      // log where we can go to test our GQL API
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// call the async function to start the new server
startApolloServer(typeDefs, resolvers);
