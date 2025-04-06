const express = require('express');
const { 
    createDono, 
    getAllDonos, 
    getDonoById, 
    updateDono, 
    deleteDono,
    patchDono
} = require('../controllers/donoController.js');

const router = express.Router();

router.post('/', createDono);
router.get('/', getAllDonos);
router.get('/:id', getDonoById);
router.put('/:id', updateDono);
router.patch('/:id', patchDono);
router.delete('/:id', deleteDono);

module.exports = router;