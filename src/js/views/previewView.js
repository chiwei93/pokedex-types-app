import View from './view.js';

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    //will add the condition for the active class later
    const markup = `
        <li class="result-item" data-id="${this._data.id}">
            <a href="#${this._data.id} " class="result-link">
                <figure class="result-fig">
                    <img src="${this._data.imageUrl}" alt="${this._data.name}" class="result-img">
                </figure>

                <div class="result-name-container">
                    <span class="result-id result-span"># ${String(this._data.id).padStart(3, '0')}</span>
                    <span class="result-name result-span">${this._data.name}</span>
                </div>
            </a>
        </li>
    
    `;

    return markup;
  }
}

export default new PreviewView();
