const express = require("express");
const {
  getAllLaunches,
  addNewLaunches,
  deleteLaunchById,
} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/", getAllLaunches);
launchesRouter.post("/", addNewLaunches);
launchesRouter.delete("/:id", deleteLaunchById);

module.exports = launchesRouter;
