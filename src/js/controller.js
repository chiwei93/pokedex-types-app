import 'regenerator-runtime/runtime';
import 'core-js/stable';
import * as model from './model.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import pokemonView from './views/pokemonView.js';

//function for controlling the behavior of the search function
const controlSearchResults = async function () {
  try {
    //render spinner
    resultsView.renderSpinner();

    //clear the pagination div
    paginationView.clear();

    const query = searchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);

    //render the results
    resultsView.render(model.getSearchResultsPage(1));

    //render the pagination div
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
    resultsView.renderError();
  }
};

//function for controlling the info container
const controlPokemonView = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    //render spinner
    pokemonView.renderSpinner();

    //load the data of the pokemon selected
    await model.loadPokemon(id);

    //render the info
    pokemonView.render(model.state);
  } catch (err) {
    console.error(err);
    pokemonView.renderError();
  }
};

//function for controlling the pagination
const controlPagination = function (goToPage) {
  //render the right results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //render the pagination
  paginationView.render(model.state.search);
};

//function for adding event listener
const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  pokemonView.addHandlerPokemon(controlPokemonView);
  paginationView.addHandlerPagination(controlPagination);
};

init();
