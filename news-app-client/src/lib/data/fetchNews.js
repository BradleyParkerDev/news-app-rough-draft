import axios from "axios";

const fetchNews = async(url) => {
    try {
        console.log('fetching news...')
        const newsResponse = await axios.get(`${url}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
        return newsResponse.data.articles 
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

export default fetchNews;
