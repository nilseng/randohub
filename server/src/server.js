const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const apollo = require("apollo-server-express");
const fs = require("fs");
const db = require("mongodb");
const morgan = require("morgan");

require("dotenv").config();

const isTokenValid = require("./auth/validate");
const connectToMongoDb = require("./database/databaseSetup");
const s3 = require("./s3/s3");
const typeDefs = fs.readFileSync(
  path.join(__dirname, "./schema.graphql"),
  "utf8"
);

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(morgan("tiny"));

app.use("/s3", s3);

app.use(express.static(path.join(__dirname, "../../client/build")));

const resolvers = {
  Query: {
    summits: async () => {
      const summits = await summitCollection.find({}).toArray();
      return summits;
    },
    trips: async () => {
      const trips = await tripCollection.find({}).toArray();
      return trips;
    },
    ascents: async () => {
      const ascents = await ascentCollection.find({}).toArray();
      return ascents;
    },
    images: async () => {
      const images = await imageCollection.find({}).toArray();
      return images;
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
    deleteSummits: async () => {
      const deleted = await summitCollection.deleteMany();
      return deleted.deletedCount;
    },
    createTrip: async (parent, args) => {
      const trip = args;
      const now = Date.now();
      trip.createdAt = now;
      trip.updatedAt = now;
      const res = await tripCollection.insertOne(trip);
      return res.ops[0];
    },
    updateTrip: async (parent, args) => {
      const trip = args;
      trip.updatedAt = Date.now();
      trip.imageIds = trip.imageIds.map((id) => new db.ObjectID(id));
      const { _id, ...props } = trip;
      const res = await tripCollection.findOneAndUpdate(
        {
          _id: new db.ObjectID(_id),
        },
        { $set: props },
        { returnOriginal: false }
      );
      return res.value ? res.value : null;
    },
    deleteTrips: async () => {
      const deleted = await tripCollection.deleteMany();
      return deleted.deletedCount;
    },
    deleteTrip: async (parent, args) => {
      const deleted = await tripCollection.deleteOne({
        _id: new db.ObjectID(args._id),
      });
      return deleted.deletedCount ? args._id : null;
    },
    createImage: async (parent, args) => {
      const image = args;
      image.createdAt = Date.now();
      image.tripId = new db.ObjectID(image.tripId);
      const res = await imageCollection.insertOne(image);
      return res.ops[0];
    },
    deleteImage: async (parent, args) => {
      const deleted = await imageCollection.deleteOne({
        _id: new db.ObjectID(args._id),
      });
      return deleted.deletedCount ? args._id : null;
    },
    deleteImages: async () => {
      const deleted = await imageCollection.deleteMany();
      return deleted.deletedCount;
    },
  },
  Trip: {
    images: async (parent) => {
      const images = await imageCollection
        .find({ tripId: new db.ObjectID(parent._id) })
        .toArray();
      return images;
    },
  },
  Image: {
    trip: async (parent) => {
      const trip = await tripCollection.findOne({
        imageIds: new db.ObjectID(parent._id),
      });
      return trip;
    },
  },
};

const server = new apollo.ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    const user = await isTokenValid(token);
    return { user };
  },
});

server.applyMiddleware({ app });

let summitCollection, tripCollection, ascentCollection, bucketlistCollection;
connectToMongoDb().then((res) => {
  [
    summitCollection,
    tripCollection,
    ascentCollection,
    bucketlistCollection,
    imageCollection,
  ] = res;
});

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`The server is now running on port ${process.env.PORT || 4000}`)
);

app.use(
  "/*",
  express.static(path.join(__dirname, "../../client/build", "index.html"))
);

app.use((req, res, next) => {
  if (
    !req.secure &&
    !req.headers.host === `localhost:${process.env.PORT || 4000}`
  ) {
    return res.redirect("https://" + req.headers.host + req.path);
  }
  next();
});
