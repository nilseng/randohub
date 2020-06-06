const express = require("express");
const path = require("path");
const apollo = require("apollo-server-express");
const fs = require("fs");

const connectToMongoDb = require("./database/databaseSetup");
const typeDefs = fs.readFileSync(
  path.join(__dirname, "./schema.graphql"),
  "utf8"
);

const app = express();

app.use(express.static(path.join(__dirname, "../../client/build")));

const resolvers = {
  Query: {
    summits: async () => {
      const summits = await summitCollection.find({}).toArray();
      return summits;
    },
    ascents: async () => {
      const ascents = await ascentCollection.find({}).toArray();
      return ascents;
    },
  },
  Mutation: {
    createSummit: async (parent, args) => {
      const summit = args;
      const now = Date.now();
      summit.createdAt = now;
      summit.updatedAt = now;
      const res = await summitCollection.insertOne(summit);
      return res.ops[0];
    },
  },
};

const server = new apollo.ApolloServer({
  typeDefs: typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

let summitCollection, ascentCollection, bucketlistCollection;
connectToMongoDb().then((res) => {
  [summitCollection, ascentCollection, bucketlistCollection] = res;
});

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`The server is now running on port ${process.env.PORT || 4000}`)
);

server.express.use(
  "/*",
  express.static(path.join(__dirname, "../../client/build", "index.html"))
);
