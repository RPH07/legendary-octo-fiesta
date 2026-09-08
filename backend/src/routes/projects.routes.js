const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projects.controller");
const verifyToken = require("../middleware/auth.middleware");
const controller = projectsController;

// get all projects
router.get("/", controller.getAllProjects);
// get a single project by ID
router.get("/:id", controller.getProjectById);
// create a new project
router.post("/",verifyToken, controller.createProject);
// update a project by ID
router.put("/:id",verifyToken, controller.updateProject);
// delete a project by ID
router.delete("/:id",verifyToken, controller.deleteProject);

module.exports = router;