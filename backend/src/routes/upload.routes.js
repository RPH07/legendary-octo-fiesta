const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const verifyToken = require("../middleware/auth.middleware");
const { uploadFile, deleteFile } = require("../services/upload.service");
const { uploadCv } = require('../controllers/cv.controller');

router.post('/cv', verifyToken, upload.single('file'), uploadCv);

router.post('/project-image', verifyToken, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded!" });
        const url = await uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype, 'projects');
        res.json({url});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error uploading file!" });
    }
});

router.delete('/file', verifyToken, async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ message: "No file URL provided!" });
        await deleteFile(url);
        res.json({ message: "File deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting file!" });
    }
});

module.exports = router;
