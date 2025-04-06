const mongoose = require('mongoose');

const DonoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    telefone: { type: String, required: true },
    email: { type: String, unique: true },
    endereco: {
        rua: {type: String},
        numero: {type: String},
        bairro: {type: String},
        cidade: {type: String},
        estado: {type: String},
        cep: {type: String}
    },
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
    dataCadastro: { type: Date, default: Date.now }
});

const Dono = mongoose.model('Dono', DonoSchema);

module.exports = Dono;
