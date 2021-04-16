const { ApolloServer, PubSub } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MANGODB } = require("./config.js");
const pubsub = new PubSub();
const PORT = process.env.port || 5000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MANGODB, { useNewUrlParser: true, useUnifiedTopology: true })

  .then(() => {
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server starrted at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
