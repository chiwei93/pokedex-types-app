import View from './view.js';
import { TYPES } from './../config.js';
import logo from '../../img/pokemon-logo.png';
import arrows from '../../img/arrow.svg';

class PokemonView extends View {
  _parentElement = document.querySelector('.pokedex-info-container');
  _errorMessage = 'Pokemon Not Found. Please Try Again!';

  _generateMarkup() {
    this._generateBackground(this._data.pokemon.types[0].toLowerCase());

    const markup = `
            <div class="pokemon-info-header">
                <div class="info-name-container">
                    <span class="info-name">${this._data.pokemon.name}</span>

                    <div class="type-container">
                        ${this._data.pokemon.types.map(this._generateTypeMarkup).join('')}
                    </div>
                </div>

                <span class="info-id"># ${String(this._data.pokemon.id).padStart(3, '0')}</span>
            </div>

            <div class="pokemon-img-container">
                <img src="${this._data.pokemon.imageUrl}" alt="${this._data.pokemon.name}" class="pokemon-img">
            </div>

            <div class="pokemon-info-container">
                    <div class="description-container">
                        Description:
                        <span class="description-text">
                            ${this._data.pokemon.description}
                        </span>
                    </div>

                    <div class="about-stat-container">
                        <div class="about-container">
                            <p class="about-header">About:</p>
                            <ul class="about-title about-list">
                                <li class="about-height about-item">Height</li>
                                <li class="about-height about-item">Weight</li>
                                <li class="about-height about-item">Abilities</li>
                                <li class="about-height about-item">Strength</li>
                                <li class="about-height about-item">Weakness</li>
                            </ul>

                            <ul class="about-text about-list">
                                <li class="about-text-value about-item">: ${this._data.pokemon.height}cm</li>
                                <li class="about-text-value about-item">: ${this._data.pokemon.weight}kg</li>
                                <li class="about-text-value about-item">: ${this._data.pokemon.abilities.join(
                                  ', '
                                )}</li>
                                <li class="about-text-value about-item">: ${this._data.search.strength.join(', ')}</li>
                                <li class="about-text-value about-item">: ${this._data.search.weakness.join(', ')}</li>
                            </ul>
                        </div>

                        <div class="stats-container">
                            <p class="stat-header">Base Stat:</p>

                            ${this._generateStatMarkup().join('')}
                        </div>
                    </div>

                    <div class="evolution-container">
                        <p class="evolution-header">Evolution:</p>

                        <div class="evolution-img-container">
                           ${this._generateEvolveMarkup().join('')}
                        </div>
                    </div>
                </div>

                <div class="pokemon-logo-container">
                    <img src="${logo}" alt="Pokemon Logo" class="pokemon-logo">
                </div>
      `;

    return markup;
  }

  _generateTypeMarkup(type) {
    return `<span class="info-type">${type}</span>`;
  }

  _generateStatMarkup() {
    const statArr = [];

    for (let i = 0; i < this._data.pokemon.stats.length; i++) {
      const markup = `
        <div class="stat-container">
            <span class="stat-name">${this._data.pokemon.statsName[i]}</span>
            <span class="stat-value">${this._data.pokemon.stats[i]}</span>

            <div class="stat-bar-container">
                <div class="stat-bar" style="width:${this._data.pokemon.stats[i] / 3}%;"></div>
            </div>
        </div>
        `;

      statArr.push(markup);
    }

    return statArr;
  }

  _generateEvolveMarkup() {
    const evoArr = [];

    for (let i = 0; i < this._data.pokemon.evolutionId.length; i++) {
      if (i < this._data.pokemon.evolutionId.length - 1) {
        const markup = `
                    <img src="https://pokeres.bastionbot.org/images/pokemon/${this._data.pokemon.evolutionId[i]}.png" alt="${this._data.pokemon.evolution[i]}" class="evolution-img">

                    <svg class="evolution-arrow-icon">
                        <use xlink:href="${arrows}#icon-chevron-right"></use>
                    </svg>
              `;
        evoArr.push(markup);
      } else {
        const markup = `
                    <img src="https://pokeres.bastionbot.org/images/pokemon/${this._data.pokemon.evolutionId[i]}.png" alt="${this._data.pokemon.evolution[i]}" class="evolution-img">  
            `;
        evoArr.push(markup);
      }
    }

    return evoArr;
  }

  _generateBackground(type) {
    const arr = TYPES;

    arr.forEach(el => {
      if (this._parentElement.classList.contains(el)) this._parentElement.classList.remove(el);
    });

    this._parentElement.classList.add(type);
  }

  addHandlerPokemon(handler) {
    ['hashchange', 'load'].forEach(event => {
      window.addEventListener(event, handler);
    });
  }
}

export default new PokemonView();
