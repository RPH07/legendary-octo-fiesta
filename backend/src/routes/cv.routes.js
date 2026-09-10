const express = require('express');
const verifyToken = require('../middleware/auth.middleware');
const {
    getActiveCv,
    getCvDocuments,
    activateCv,
    deleteCv,
} = require('../controllers/cv.controller');

const router = express.Router();

router.get('/active', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
}, getActiveCv);
router.get('/', verifyToken, getCvDocuments);
router.patch('/:id/activate', verifyToken, activateCv);
router.delete('/:id', verifyToken, deleteCv);

module.exports = router;
