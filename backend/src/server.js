const http = require("http");
const app = require("./app");
const { connectMongoDB } = require("./services/mongo");

const { loadPlanetsData } = require("./models/planets/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await connectMongoDB();
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log("server is raning ..");
  });
}

startServer();
