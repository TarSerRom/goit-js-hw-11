export default class NewsApiService{
    constructor() {
        this.searchQuery = "";
        this.page = 1;
    }

    fetchArticles() {
        console.log(this);
       
        return fetch(`https://pixabay.com/api/?key=24711891-660ee969a9a9139e98081d9b6&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.incrementPage();

                return data.hits;
            });

    }

    incrementPage() {
        this.page += 1; 
    }
    resetPage() {
        this.page = 1;
    }

    get query() {
      console.log(this.searchQuery);
      return this.searchQuery;
    }
    set query(newQuery) {
      this.searchQuery = newQuery;
    }
}