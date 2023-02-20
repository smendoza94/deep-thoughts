const { User, Thought } = require("../models");

// these resolvers contain menthods with the names as the query or mutation

// pass in parent as a placeholder parameter for first parameter's spot to
// access the username argument from the second parameter. Use a ternary operator
// to check if username exists. If yes, set params to an object with username key
// If not, return an empty object. Pass that object, with or without any data in it
// , .find() method. Data? , perform a lookup by a specific username. If there's not,
//  return every thought.

const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
    // get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("thoughts")
          .populate("friends");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    // the Mongoose User model creates a new user in the database
    // with whatever is passed in as the args.

    // the two mutation resolvers to sign a token and return an object that
    // combines the token with the user's data
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      //  throwing an error like this would cause your server to crash,
      // but GraphQL will catch the error and send it to the client instead.
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
