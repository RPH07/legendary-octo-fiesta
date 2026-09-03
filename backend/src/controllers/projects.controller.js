const prisma = require('../config/db');

// get all projects
async function getAllProjects(req, res) {
    try {
        const projects = await prisma.project.findMany({
            orderBy: {
                createdAt: 'desc'
            },
        });
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// get a single project by ID
async function getProjectById(req, res) {
    try {
        const project = await prisma.project.findUnique({
            where: {
                id: number(req.params.id)
            },
        });

        if(!project) return res.status(404).json({error: 'Project not found'});
        res.json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// create a new project(post)
async function createProject(req, res) {
    try {
        const { title, description, techStack, imageUrl, previewUrl} = req.body;

        if(!title || !description || !techStack) {
            return res.status(400).json({ error: 'Title, description, and tech stack are required' });
        }
        
        const newProject = await prisma.project.create({
            data: {
                title,
                description,
                techStack,
                imageUrl,
                previewUrl
            },
        });
        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// update a project by ID
async function updateProject(req, res) {
    try {
        const { title, description, techStack, imageUrl, previewUrl} = req.body;

        if(!title || !description || !techStack) {
            return res.status(400).json({ error: 'Title, description, and tech stack are required' });
        }
        
        const updateProject = await prisma.project.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                title,
                description,
                techStack,
                imageUrl,
                previewUrl
            },
        });
        res.json(updateProject);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Project not found' });
        }
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// delete a project by ID
async function deleteProject(req, res) {
    try {
        const { title, description, techStack, imageUrl, previewUrl} = req.body;

        if(!title || !description || !techStack) {
            return res.status(400).json({ error: 'Title, description, and tech stack are required' });
        }
        
        const deleteProject = await prisma.project.delete({
            where: {
                id: Number(req.params.id)
            },
        });
        res.status(204).send();
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Project not found' });
        }
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
}