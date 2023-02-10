const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function connectMongoDB() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function mongoDisconnet() {
  await mongoose.disconnect();
}

module.exports = { connectMongoDB, mongoDisconnet };
