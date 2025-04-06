const express = require('express');
const router = express.Router();
const {createPet, getAllPets, getPetById, updatePet, deletePet, patchPet} = require('../controllers/petController.js');

router.post('/', createPet);
router.get('/', getAllPets);
router.get('/:id', getPetById);
router.put('/:id', updatePet);
router.patch('/:id', patchPet);
router.delete('/:id', deletePet);

module.exports = router;
