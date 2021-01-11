import View from './view.js';
import icons from '../../img/sprite.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-pagination');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;

    const numberOfPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    //if on the 1st page and there are more pages
    if (currentPage === 1 && numberOfPages > 1) {
      return `
        <div class="pagination-btn-container">
      
            <button class="btn-pagination btn-pagination-next" data-goto="${currentPage + 1}">
                Page ${currentPage + 1}
                <svg class="btn-pagination-icon icon-arrow-right">
                    <use xlink:href="${icons}#icon-long-arrow-right"></use>
                </svg>
            </button>
        </div>

        <span class="pagination-text">Page ${currentPage} of ${numberOfPages}</span>
      `;
    }

    //if on the last page
    if (currentPage === numberOfPages) {
      return `
        <div class="pagination-btn-container">

            <button class="btn-pagination btn-pagination-prev" data-goto="${currentPage - 1}">
                <svg class="btn-pagination-icon icon-arrow-left">
                    <use xlink:href="${icons}#icon-long-arrow-left"></use>
                </svg>
                Page ${currentPage - 1}  
            </button>
      
      
        </div>

        <span class="pagination-text">Page ${currentPage} of ${numberOfPages}</span>
      `;
    }

    //if on other pages
    if (currentPage < numberOfPages) {
      return `
        <div class="pagination-btn-container">

            <button class="btn-pagination btn-pagination-prev" data-goto="${currentPage - 1}">
                <svg class="btn-pagination-icon icon-arrow-left">
                    <use xlink:href="${icons}#icon-long-arrow-left"></use>
                </svg>
                Page ${currentPage - 1}  
            </button>

            <button class="btn-pagination btn-pagination-next" data-goto="${currentPage + 1}">
                Page ${currentPage + 1}
                <svg class="btn-pagination-icon icon-arrow-right">
                    <use xlink:href="${icons}#icon-long-arrow-right"></use>
                </svg>
            </button>

        </div>

        <span class="pagination-text">Page ${currentPage} of ${numberOfPages}</span>
      
      `;
    }

    //if on the 1st page and there are no other pages
    return `
        <span class="pagination-text">Page ${currentPage} of ${numberOfPages}</span>
    `;
  }
}

export default new PaginationView();
