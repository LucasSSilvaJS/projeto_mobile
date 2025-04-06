const params = new URLSearchParams(window.location.search);
const id = params.get('id');

document.addEventListener('DOMContentLoaded', async (event) => {

    if (id) {
        const titulo = document.querySelector('.titulo');
        titulo.innerHTML = "Editar dono"

        try {
            const promise = await fetch(`http://localhost:3000/api/donos/${id}`);
            const response = await promise.json();
            if (promise.ok) {
                document.getElementById('nome').value = response.nome;
                document.getElementById('cpf').value = response.cpf;
                document.getElementById('telefone').value = response.telefone;
                document.getElementById('email').value = response.email;
                document.getElementById('rua').value = response.endereco.rua;
                document.getElementById('numero').value = response.endereco.numero;
                document.getElementById('bairro').value = response.endereco.bairro;
                document.getElementById('cidade').value = response.endereco.cidade;
                document.getElementById('estado').value = response.endereco.estado;
                document.getElementById('cep').value = response.endereco.cep;
            }
        } catch (error) {
            console.error(error);
        }
    }
});

const donoForm = document.getElementById('dono-form');

donoForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    const cep = document.getElementById('cep').value;

    if (!nome || !cpf || !telefone || !email || !rua || !numero || !bairro || !cidade || !estado || !cep) {
        alert('Preencha todos os campos');
        return;
    }

    if(id){
        try {
            const response = await fetch(`http://localhost:3000/api/donos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, cpf, telefone, email, endereco: {rua, numero, bairro, cidade, estado, cep} })
            });
    
            if (response.ok) {
                const dono = await response.json();
                alert('Dono editado com sucesso!');
                console.log(dono);
                donoForm.reset();
            } else {
                alert('Erro ao editar dono');
            }
        } catch (error) {
            console.error(error);
        };
    }else{
        try {
            const response = await fetch('http://localhost:3000/api/donos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, cpf, telefone, email, endereco: {rua, numero, bairro, cidade, estado, cep} })
            });
    
            if (response.ok) {
                const dono = await response.json();
                alert('Dono cadastrado com sucesso!');
                console.log(dono);
                donoForm.reset();
            } else {
                alert('Erro ao cadastrar dono');
            }
        } catch (error) {
            console.error(error);
        };
    }

});