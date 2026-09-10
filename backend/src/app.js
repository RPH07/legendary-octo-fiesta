const express = require("express");
const projectsRoutes = require("./routes/projects.routes");
const authRoutes = require("./routes/auth.routes");
const uploadRoutes = require("./routes/upload.routes");
const path = require("path");

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {res.json({status: 'ok'});});
app.use('/auth', authRoutes);
app.use('/projects', projectsRoutes);
app.use('/upload', uploadRoutes);
app.use('/admin', express.static(path.join(__dirname, '../public')));


module.exports = app;