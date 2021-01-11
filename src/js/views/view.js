import pokeball from '../../img/pokeball.png';
import icons from '../../img/sprite.svg';

//the parent class for all views class
export default class View {
  _data;

  //render method
  render(data, render = true) {
    if (!data) return this._renderError();

    this._data = data;

    const markup = this._generateMarkup();

    if (!render) return markup;

    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //clear method
  clear() {
    this._parentElement.innerHTML = '';
  }

  //render spinner method
  renderSpinner() {
    const markup = `
        <div class="spinner">
            <img src="${pokeball}" alt="Pokeball" class="spinner-icon">
        </div>
      `;

    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //render the error message
  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error-message-container">
            <svg class="error-icon">
                <use xlink:href="${icons}#icon-exclamation-circle"></use>
            </svg>
            <span class="error-message">${message}</span>
        </div>
    
    `;

    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
