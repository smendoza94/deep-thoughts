// these resolvers contain menthods with the names as the query or mutation
const resolvers = {
  Query: {
    helloWorld: () => {
      return "Hello world!";
    },
  },
};

module.exports = resolvers;
