const express = require("express");
const path = require("path");
const apollo = require("apollo-server-express");
const fs = require("fs");
const db = require("mongodb");

const connectToMongoDb = require("./database/databaseSetup");
const typeDefs = fs.readFileSync(
  path.join(__dirname, "./schema.graphql"),
  "utf8"
);

const app = express();

app.use((req, res, next) => {
  if (
    !req.secure &&
    !req.headers.host === `localhost:${process.env.PORT || 4000}`
  ) {
    return res.redirect("https://" + req.headers.host + req.path);
  }
  next();
});

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
    deleteSummit: async (parent, args) => {
      const deleted = await summitCollection.deleteOne({
        _id: new db.ObjectID(args._id),
      });
      return deleted.deletedCount ? args._id : null;
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

app.use(
  "/*",
  express.static(path.join(__dirname, "../../client/build", "index.html"))
);
