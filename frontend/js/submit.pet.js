const params = new URLSearchParams(window.location.search);
const id = params.get('id');

document.addEventListener('DOMContentLoaded', async (event) => {
    if (id) {
        const titulo = document.querySelector('.titulo');
        titulo.innerHTML = "Editar pet"

        try {
            const promise = await fetch(`http://localhost:3000/api/pets/${id}`);
            const response = await promise.json();
            if (promise.ok) {
                document.getElementById('nome').value = response.nome;
                document.getElementById('especie').value = response.especie;
                document.getElementById('raca').value = response.raca;
                document.getElementById('idade').value = response.idade;
                document.getElementById('sexo').value = response.sexo;
            }
        } catch (error) {
            console.error(error);
        }
    }
});

const petForm = document.getElementById('pet-form');

petForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const especie = document.getElementById('especie').value;
    const raca = document.getElementById('raca').value;
    const idade = document.getElementById('idade').value;
    const sexo = document.getElementById('sexo').value;

    if (!nome || !especie || !raca || !idade || !sexo) {
        alert('Preencha todos os campos');
        return;
    }

    if(id){
        try {
            const response = await fetch(`http://localhost:3000/api/pets/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, especie, raca, idade, sexo })
            });
    
            if (response.ok) {
                const pet = await response.json();
                alert('Pet editado com sucesso!');
                console.log(pet);
                petForm.reset();
            } else {
                alert('Erro ao editar pet');
            }
        } catch (error) {
            console.error(error);
        };
    }else{
        try {
            const response = await fetch('http://localhost:3000/api/pets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, especie, raca, idade, sexo })
            });
    
            if (response.ok) {
                const pet = await response.json();
                alert('Pet cadastrado com sucesso!');
                console.log(pet);
                petForm.reset();
            } else {
                alert('Erro ao cadastrar pet');
            }
        } catch (error) {
            console.error(error);
        };
    }
});
