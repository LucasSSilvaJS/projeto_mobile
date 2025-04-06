const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    especie: { type: String, required: true, enum: ['Cão', 'Gato'] },
    raca: { type: String, required: true },
    idade: { type: Number, required: true },
    sexo: { type: String, enum: ['Macho', 'Fêmea'], required: true },
    dono: { type: mongoose.Schema.Types.ObjectId, ref: 'Dono' },
    dataCadastro: { type: Date, default: Date.now },
    disponibilidade: { type: Boolean, default: true }
});

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;
