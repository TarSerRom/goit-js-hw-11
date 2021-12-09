import './sass/main.scss';
import LoadMoreBtn from './components/load-more';
import NewsApiService from './components/new-api';
import hitsTemplates from './components/hitsTemplates.hbs';
import { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchFormEl = document.getElementById('search-form');
const imagesContainerEl = document.querySelector('.gallery');

const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});


searchFormEl.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);


function onSearch(e) {
    e.preventDefault();
    
    newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
    

    if (newsApiService.query === '') {
        return Notify.warning('Please, fill the main field');
    }
    
    loadMoreBtn.show();
    newsApiService.resetPage();
    clearHitsMarkup();
    fetchHits()
        
}

function fetchHits() {
    loadMoreBtn.disable();
    newsApiService.fetchArticles().then(hits => {
        appendHitsMarkup(hits);
        loadMoreBtn.enable();
    })
}


function appendHitsMarkup(hits) {
  
    imagesContainerEl.insertAdjacentHTML('beforeend', hitsTemplates(hits));

     if (hits.length < 40 && hits.length > 0) {
    loadMoreBtn.hide();
    Notify.info("We're sorry, but you've reached the end of search results.")
  }
  
  if (hits.length === 0) {
    loadMoreBtn.hide();
    return Notify.warning("Sorry, there are no images matching your search query. Please try again.");
  }
}

function clearHitsMarkup() {
imagesContainerEl.innerHTML = '';
}