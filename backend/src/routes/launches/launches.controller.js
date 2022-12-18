const launchesModel = require("../../models/launch/launches.model");

async function getAllLaunches(req, res) {
  return res.status(200).json(await launchesModel.getAllLaunches());
}

async function addNewLaunches(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  await launchesModel.scheduleNewLaunch(launch);

  return res.status(201).json(launch);
}

async function deleteLaunchById(req, res) {
  const launchId = Number(req.params.id);

  const exists = await launchesModel.isLaunchExists(launchId);
  if (!exists) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  const aborted = await launchesModel.deleteLaunchById(launchId);

  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }

  return res.status(200).json({
    ok: true,
  });
}

module.exports = { getAllLaunches, addNewLaunches, deleteLaunchById };
