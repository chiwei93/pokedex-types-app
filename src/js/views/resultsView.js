import View from './view.js';
import previewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results-list');
  _errorMessage = 'Pokemon Type Not Found. Please Try Again!';

  constructor() {
    super();
    this._addHandlerClick();
  }

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }

  _toggleActive(e) {
    const children = this._parentElement.querySelectorAll('li');

    const link = e.target.closest('.result-item');

    if (!link) return;

    [...children].forEach(child => {
      if (child !== link) {
        child.classList.remove('active');
      } else {
        child.classList.add('active');
      }
    });
  }

  _addHandlerClick() {
    this._parentElement.addEventListener('click', this._toggleActive.bind(this));
  }
}

export default new ResultsView();
