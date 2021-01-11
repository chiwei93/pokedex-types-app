class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement.querySelector('.search-input').value;
    this._clearInputField();
    this._blurInputField();

    return query;
  }

  _clearInputField() {
    this._parentElement.querySelector('.search-input').value = '';
  }

  _blurInputField() {
    this._parentElement.querySelector('.search-input').blur();
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      handler();
    });
  }
}

export default new SearchView();
