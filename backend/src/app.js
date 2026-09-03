const express = require("express");
const projectsRoutes = require("./routes/projects.routes");

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {res.json({status: 'ok'});});

app.use('/projects', projectsRoutes);

module.exports = app;