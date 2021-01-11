import { timeout, AJAX } from './helper.js';
import { RESULTS_PER_PAGE, URL, STAT_NAMES, TIMEOUT_SEC } from './config.js';

export const state = {
  pokemon: {},
  search: {
    query: '',
    resultsUrl: [],
    strength: [],
    weakness: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
};

//function for creating individual pokemon object
const createIndividualPokemonObj = async function (url) {
  //creating the pokemon object
  const dataUrl = await Promise.race([AJAX(url), timeout(TIMEOUT_SEC)]);

  const individualPokemon = {};

  individualPokemon.id = dataUrl.id;
  individualPokemon.height = dataUrl.height / 10;
  individualPokemon.weight = dataUrl.weight / 10;
  individualPokemon.name = dataUrl.name.replace(dataUrl.name[0], dataUrl.name[0].toUpperCase());
  individualPokemon.speciesUrl = dataUrl.species.url;
  individualPokemon.abilities = dataUrl.abilities.map(obj => {
    return obj.ability.name.replace(obj.ability.name[0], obj.ability.name[0].toUpperCase());
  });
  individualPokemon.stats = dataUrl.stats.map(obj => obj.base_stat);
  individualPokemon.statsName = STAT_NAMES;
  individualPokemon.imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${dataUrl.id}.png`;
  individualPokemon.types = dataUrl.types.map(obj =>
    obj.type.name.replace(obj.type.name[0], obj.type.name[0].toUpperCase())
  );

  //finding the evolution chain url
  const dataEvo = await AJAX(individualPokemon.speciesUrl);

  individualPokemon.description = dataEvo.flavor_text_entries[0].flavor_text.replaceAll('\n', ' ');

  individualPokemon.evolutionUrl = dataEvo.evolution_chain.url;

  //creating the evolution arrays
  const dataChain = await AJAX(individualPokemon.evolutionUrl);

  individualPokemon.evolution = [];
  individualPokemon.evolutionId = [];

  const data0 = await AJAX(dataChain.chain.species.url);

  individualPokemon.evolutionId.push(data0.id);

  //check if there is evolution
  if (dataChain.chain.evolves_to.length === 0) return individualPokemon;

  individualPokemon.evolution.push(
    dataChain.chain.species.name.replace(dataChain.chain.species.name[0], dataChain.chain.species.name[0].toUpperCase())
  );

  individualPokemon.evolution.push(
    dataChain.chain.evolves_to[0].species.name.replace(
      dataChain.chain.evolves_to[0].species.name[0],
      dataChain.chain.evolves_to[0].species.name[0].toUpperCase()
    )
  );

  const data1 = await AJAX(dataChain.chain.evolves_to[0].species.url);

  individualPokemon.evolutionId.push(data1.id);

  //check if there is evolution
  if (dataChain.chain.evolves_to[0].evolves_to.length === 0) return individualPokemon;

  individualPokemon.evolution.push(
    dataChain.chain.evolves_to[0].evolves_to[0].species.name.replace(
      dataChain.chain.evolves_to[0].evolves_to[0].species.name[0],
      dataChain.chain.evolves_to[0].evolves_to[0].species.name[0].toUpperCase()
    )
  );

  const data2 = await AJAX(dataChain.chain.evolves_to[0].evolves_to[0].species.url);

  individualPokemon.evolutionId.push(data2.id);

  return individualPokemon;
};

//function for loading the search result data
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await Promise.race([AJAX(`${URL}type/${state.search.query}`), timeout(TIMEOUT_SEC)]);

    state.search.resultsUrl = data.pokemon.map(obj => obj.pokemon.url);
    state.search.strength = data.damage_relations.double_damage_to.map(obj =>
      obj.name.replace(obj.name[0], obj.name[0].toUpperCase())
    );
    state.search.weakness = data.damage_relations.double_damage_from.map(obj =>
      obj.name.replace(obj.name[0], obj.name[0].toUpperCase())
    );

    const results = await Promise.all(state.search.resultsUrl.map(async url => await createIndividualPokemonObj(url)));

    state.search.results = results;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//function for getting the right 10 results for each page
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

//function for loading the pokemon info
export const loadPokemon = async function (id) {
  try {
    const data = await Promise.race([createIndividualPokemonObj(`${URL}pokemon/${id}`), timeout(TIMEOUT_SEC)]);

    state.pokemon = data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
