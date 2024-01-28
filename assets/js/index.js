const pokemonName = document.querySelector('.pokemon_name');
const pokemonId = document.querySelector('.pokemon_id');
const pokemonGif = document.querySelector('.pokemon_gif');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnPrev = document.querySelector('.button_prev');
const btnNext = document.querySelector('.button_next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
};

const getPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonId.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonGif.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonId.innerHTML = data.id;
    pokemonGif.src =
      data['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ];
    searchPokemon = data.id;
    input.value = '';
  } else {
    pokemonGif.style.display = 'none';
    pokemonName.innerHTML = ' Not found :c';
    pokemonId.innerHTML = '';
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  getPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    getPokemon(searchPokemon);
  }
});

btnNext.addEventListener('click', () => {
  searchPokemon += 1;
  getPokemon(searchPokemon);
});

getPokemon(searchPokemon);
