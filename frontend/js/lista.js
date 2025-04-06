async function loadContent() {
    try {
        const donos = await fetch('http://localhost:3000/api/donos').then(response => response.json());

        const pets = await fetch('http://localhost:3000/api/pets').then(response => response.json());

        const donosList = document.getElementById('donos-list');

        donosList.innerHTML = '';
        donos.forEach(dono => {
            donosList.innerHTML += `
                <article class="article-dono" id="${dono._id}">
                    <h3 class="nome-dono">${dono.nome}</h3>
                    <span class="email-dono">${dono.email}</span>
                    <div class="buttons">
                        <button class="editar">Editar</button>
                        <button class="excluir">Excluir</button>
                    </div>

                    ${dono.pets.length > 0 ? `
                    <hr>
                    <div class="pets">
                        <h4>Pets</h4>
                        <ul>
                            ${dono.pets.map(pet => `
                                <li class="pet-dono" data-id="${pet._id}">
                                    <span>
                                        ${pet.nome}
                                    </span>
                                    <div class="buttons-pets">
                                        <button class="editar-pet">Editar</button>
                                        <button class="excluir-pet">Excluir</button>
                                    </div>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    <hr>
                    <div class="atribuir-pets">
                        <select class="pets-select">
                            <option value="" selected disabled>
                                Selecione um pet
                            </option>
                            ${pets.map(pet => `
                                <option value="${pet._id}">
                                    ${pet.nome}
                                </option>
                            `).join('')}
                        </select>
                        <button class="atribuir-btn">Atribuir pet</button>
                    </div>
                </article>
            `
        });

        bindEventListeners();
    } catch (error) {
        console.error(error);
    }
}

const deleteDono = async (id) => {
    try {
        await fetch(`http://localhost:3000/api/donos/${id}`, {
            method: 'DELETE'
        });
        await loadContent();
    } catch (error) {
        console.error(error);
    }
};

const setDisponibilidadePet = async (id, status) => {
    try {
        await fetch(`http://localhost:3000/api/pets/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ disponibilidade: status })
        });
        await loadContent();
    } catch (error) {
        console.error(error);
    }
};

const atribuirPet = async (idDono, idPet, donoPets) => {
    console.log('ATRIBUIR:', { idDono, idPet, donoPets });
    try {
        await loadContent();
        await fetch(`http://localhost:3000/api/donos/${idDono}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pets: [...donoPets, idPet] })
        });
        await setDisponibilidadePet(idPet, false);
    } catch (error) {
        console.error(error);
    }
};

const removerPet = async (idDono, idPet, donoPets) => {
    const novosPets = donoPets.filter(id => id !== idPet);
    try {
        await fetch(`http://localhost:3000/api/donos/${idDono}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pets: novosPets })
        });
        await setDisponibilidadePet(idPet, true);
    } catch (error) {
        console.error(error);
    }
};

const bindEventListeners = () => {
    document.querySelectorAll('.excluir').forEach(btn => {
        btn.addEventListener('click', async (event) => {
            const donoId = btn.closest('.article-dono').id;
            await deleteDono(donoId);
        });
    });

    document.querySelectorAll('.editar').forEach(btn => {
        btn.addEventListener('click', async (event) => {
            event.preventDefault();
            const donoElement = btn.closest('.article-dono');
            const donoId = donoElement.id;
            window.location.href = `dono.html?id=${donoId}`;
        });
    });

    document.querySelectorAll('.atribuir-btn').forEach(btn => {
        btn.addEventListener('click', async (event) => {
            const donoElement = btn.closest('.article-dono');
            const donoId = donoElement.id;
            const select = donoElement.querySelector('.pets-select');
            const petId = select.value;

            const donoPets = Array.from(donoElement.querySelectorAll('.pet-dono'))
                .map(li => li.getAttribute('data-id'));

            if (petId) {
                await atribuirPet(donoId, petId, donoPets).catch(e => console.log(e));
            } else {
                alert('Selecione um pet para atribuir.');
            }
        });
    });

    document.querySelectorAll('.excluir-pet').forEach(btn => {
        btn.addEventListener('click', async (event) => {
            const donoElement = btn.closest('.article-dono');
            const donoId = donoElement.id;
            const idPet = btn.closest('.pet-dono').getAttribute('data-id');
    
            const donoPets = Array.from(donoElement.querySelectorAll('.pet-dono'))
                .map(li => li.getAttribute('data-id'));
    
            await removerPet(donoId, idPet, donoPets);
        });
    });

    document.querySelectorAll('.editar-pet').forEach(btn => {
        btn.addEventListener('click', async (event) => {
            event.preventDefault();
            const petId = btn.closest('.pet-dono').getAttribute('data-id');
            window.location.href = `pet.html?id=${petId}`;
        });
    });
};

document.addEventListener('DOMContentLoaded', async (event) => {
    await loadContent();
    bindEventListeners();
});