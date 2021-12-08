import './sass/main.scss';
import NewsApiService from './components/new-api';

const searchFormEl = document.getElementById('search-form');
const imagesContainerEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('[data-action="load-more"]')

const newsApiService = new NewsApiService();

searchFormEl.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch(e) {
    e.preventDefault();

    newsApiService.query = e.currentTarget.elements.searchQuery.value;
    newsApiService.resetPage();
    newsApiService.fetchArticles();
}

function onLoadMore() {

    newsApiService.fetchArticles();
}


    //${this.searchQuery}/
    
    /**const options = {
    params: {
        key: '24711891-660ee969a9a9139e98081d9b6',
        q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${this.page}`,
        per_page: 40,
    }
}
*/