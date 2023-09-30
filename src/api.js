import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = "38857854-067aa7c8dbb389fbf2efb7da8";


 export const fetchImgs = async (searchQuery, page = 1) => {
  
    const { data } = await axios.get(BASE_URL, {
        params:
        {
            key: API_KEY,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            q: searchQuery,
            page,
            per_page: 12,
        }
    });
     const { hits, totalHits } = data;
    return { hits, totalHits };
};
