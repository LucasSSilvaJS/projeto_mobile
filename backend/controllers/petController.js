const Pet = require('../models/pet.js');

// Criar um novo pet
exports.createPet = async (req, res) => {
    try {
        const {nome, especie, raca, idade, sexo, dono} = req.body;
        const pet = new Pet({nome, especie, raca, idade, sexo, dono});
        await pet.save();
        res.status(201).json(pet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obter todos os pets
exports.getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find().populate('dono').where({disponibilidade: true});
        res.json(pets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter um pet por ID
exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id).populate('dono');
        if (!pet) {
            return res.status(404).json({ error: 'Pet não encontrado' });
        }
        res.json(pet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um pet
exports.updatePet = async (req, res) => {
    try {
        const {nome, especie, raca, idade, sexo, dono} = req.body;
        const pet = await Pet.findByIdAndUpdate(req.params.id, {nome, especie, raca, idade, sexo, dono}, { new: true });
        if (!pet) {
            return res.status(404).json({ error: 'Pet não encontrado' });
        }
        res.json(pet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Deletar um pet
exports.deletePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id);
        if (!pet) {
            return res.status(404).json({ error: 'Pet não encontrado' });
        }
        res.json({ message: 'Pet removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.patchPet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!pet) {
            return res.status(404).json({ error: 'Pet não encontrado' });
        }

        res.json(pet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
