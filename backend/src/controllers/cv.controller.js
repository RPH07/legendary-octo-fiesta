const prisma = require('../config/db');
const { randomUUID } = require('crypto');
const { uploadFile, deleteFile } = require('../services/upload.service');

function parseId(value) {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

async function uploadCv(req, res) {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded!' });

    const isPdf = req.file.mimetype === 'application/pdf'
        && req.file.originalname.toLowerCase().endsWith('.pdf');
    if (!isPdf) return res.status(400).json({ message: 'CV must be a PDF file!' });

    let url;
    try {
        url = await uploadFile(req.file.buffer, `${randomUUID()}.pdf`, req.file.mimetype, 'cv');
        const cv = await prisma.$transaction(async (tx) => {
            await tx.cvDocument.updateMany({
                where: { isActive: true },
                data: { isActive: false },
            });

            return tx.cvDocument.create({
                data: { fileName: req.file.originalname, url, isActive: true },
            });
        });

        return res.status(201).json({ cv });
    } catch (error) {
        if (url) {
            try {
                await deleteFile(url);
            } catch (cleanupError) {
                console.error('Error cleaning up uploaded CV:', cleanupError);
            }
        }
        console.error('Error uploading CV:', error);
        return res.status(500).json({ message: 'Error uploading CV!' });
    }
}

async function getActiveCv(req, res) {
    try {
        const cv = await prisma.cvDocument.findFirst({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
        });

        if (!cv) return res.status(404).json({ message: 'No active CV available.' });
        return res.json({ cv });
    } catch (error) {
        console.error('Error fetching active CV:', error);
        return res.status(500).json({ message: 'Error fetching active CV!' });
    }
}

async function getCvDocuments(req, res) {
    try {
        const documents = await prisma.cvDocument.findMany({
            orderBy: [{ isActive: 'desc' }, { createdAt: 'desc' }],
        });

        const activeCv = documents.find((document) => document.isActive) || null;
        const archivedCvs = documents.filter((document) => !document.isActive);
        return res.json({ activeCv, archivedCvs });
    } catch (error) {
        console.error('Error fetching CV documents:', error);
        return res.status(500).json({ message: 'Error fetching CV documents!' });
    }
}

async function activateCv(req, res) {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: 'Invalid CV ID.' });

    try {
        const cv = await prisma.cvDocument.findUnique({ where: { id } });
        if (!cv) return res.status(404).json({ message: 'CV not found.' });

        await prisma.$transaction([
            prisma.cvDocument.updateMany({ where: { isActive: true }, data: { isActive: false } }),
            prisma.cvDocument.update({ where: { id }, data: { isActive: true } }),
        ]);

        return res.json({ message: 'CV is now active.' });
    } catch (error) {
        console.error('Error activating CV:', error);
        return res.status(500).json({ message: 'Error activating CV!' });
    }
}

async function deleteCv(req, res) {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ message: 'Invalid CV ID.' });

    try {
        const cv = await prisma.cvDocument.findUnique({ where: { id } });
        if (!cv) return res.status(404).json({ message: 'CV not found.' });

        await deleteFile(cv.url);

        await prisma.$transaction(async (tx) => {
            await tx.cvDocument.delete({ where: { id } });

            if (cv.isActive) {
                const fallback = await tx.cvDocument.findFirst({
                    where: { isActive: false },
                    orderBy: { createdAt: 'desc' },
                });
                if (fallback) {
                    await tx.cvDocument.update({ where: { id: fallback.id }, data: { isActive: true } });
                }
            }
        });

        return res.status(204).send();
    } catch (error) {
        console.error('Error deleting CV:', error);
        return res.status(500).json({ message: 'Error deleting CV!' });
    }
}

module.exports = { uploadCv, getActiveCv, getCvDocuments, activateCv, deleteCv };
