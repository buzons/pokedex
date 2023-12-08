//tomar la api en una variavle
const API = 'https://pokeapi.co/api/v2/pokemon/';
//obtener los elementos del html
const buscar = document.getElementById('search');
const pokedex = document.getElementById('pokedex');

// Función para mostrar un mensaje de error
function showError(message) {
    pokedex.innerHTML = `<p class="error">${message}</p>`;
}

// Función para buscar un Pokémon
async function searchPokemon() {
    // Obtener el valor del campo de búsqueda y convertirlo a minúsculas
    const BuscarPokemon = buscar.value.toLowerCase();

    try {
        // Realizar una petición a la API de PokeAPI con el nombre del Pokémon
        const response = await fetch(API + BuscarPokemon);
        if (!response.ok) {
            // Si la respuesta no es exitosa, mostrar un mensaje de error
            showError(`No se encontró ningún Pokémon llamado "${BuscarPokemon}"`);
            return;
        }

        // Convertir la respuesta a JSON
        const data = await response.json();

        // Mostrar los datos del Pokémon en el contenedor de resultados
        pokedex.innerHTML = 
        `
            <div class="card-container">
            <h2>${data.name.toUpperCase()}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>Número: ${data.id}</p>
            <p>Altura: ${data.height / 10}m</p>
            <p>Peso: ${data.weight / 10}km</p>
            </div>
        `;
    } catch (error) {
        // Si ocurre algún error durante la petición, mostrar un mensaje de error
        showError('Ha ocurrido un error al buscar el Pokémon');
        console.error(error);
    }
}

// Agregar un controlador de eventos al botón de búsqueda
document.querySelector('button').addEventListener('click', searchPokemon);