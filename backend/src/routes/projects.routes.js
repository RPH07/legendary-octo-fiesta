const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projects.controller");
const verifyToken = require("../middleware/auth.middleware");
const controller = projectsController;

router.use(verifyToken);

// get all projects
router.get("/", controller.getAllProjects);
// get a single project by ID
router.get("/:id", controller.getProjectById);
// create a new project
router.post("/", controller.createProject);
// update a project by ID
router.put("/:id", controller.updateProject);
// delete a project by ID
router.delete("/:id", controller.deleteProject);

module.exports = router;
