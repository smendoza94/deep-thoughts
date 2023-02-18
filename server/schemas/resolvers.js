const { User, Thought } = require("../models");

// these resolvers contain menthods with the names as the query or mutation

// pass in parent as a placeholder parameter for first parameter's spot to
// access the username argument from the second parameter. Use a ternary operator
// to check if username exists. If yes, set params to an object with username key
// If not, return an empty object. Pass that object, with or without any data in it
// , .find() method. Data? , perform a lookup by a specific username. If there's not,
//  return every thought.
const resolvers = {
  Query: {
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
  },
};

module.exports = resolvers;
