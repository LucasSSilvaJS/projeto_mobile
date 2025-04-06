const Dono = require('../models/dono.js');

// Criar um novo dono
exports.createDono = async (req, res) => {
    try {
        const { nome, cpf, telefone, email, endereco, pets } = req.body;

        const novoDono = new Dono({
            nome,
            cpf,
            telefone,
            email,
            endereco,
            pets
        });

        await novoDono.save();
        res.status(201).json(novoDono);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obter todos os donos
exports.getAllDonos = async (req, res) => {
    try {
        const donos = await Dono.find().populate('pets'); // Popula os pets do dono
        res.json(donos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter um dono por ID
exports.getDonoById = async (req, res) => {
    try {
        const dono = await Dono.findById(req.params.id).populate('pets');
        if (!dono) {
            return res.status(404).json({ error: 'Dono não encontrado' });
        }
        res.json(dono);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um dono
exports.updateDono = async (req, res) => {
    try {
        const { nome, cpf, telefone, email, endereco, pets } = req.body;

        const donoAtualizado = await Dono.findByIdAndUpdate(
            req.params.id,
            { nome, cpf, telefone, email, endereco, pets },
            { new: true }
        );

        if (!donoAtualizado) {
            return res.status(404).json({ error: 'Dono não encontrado' });
        }

        res.json(donoAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Deletar um dono
exports.deleteDono = async (req, res) => {
    try {
        const dono = await Dono.findByIdAndDelete(req.params.id);
        if (!dono) {
            return res.status(404).json({ error: 'Dono não encontrado' });
        }
        res.json({ message: 'Dono removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.patchDono = async (req, res) => {
    try {
        const dono = await Dono.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!dono) {
            return res.status(404).json({ error: 'Dono não encontrado' });
        }

        res.json(dono);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};