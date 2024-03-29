const axios = require('axios').default;

export default class NewsApiService{
    constructor() {
        this.searchQuery = "";
        this.page = 1;
    }

    async fetchArticles() {
     
    const axiosOptions = {
        method: 'get',
    url: 'https://pixabay.com/api/',
      params: {
          key: '24711891-660ee969a9a9139e98081d9b6',
           q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${this.page}`,
        per_page: 40,
      },
      
    };

     try {
        const response = await axios( axiosOptions );
        
        const data = response.data;
        console.log(data)
        this.incrementPage();
         return data;
    }
    catch (error) {
      console.error(error)
}
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