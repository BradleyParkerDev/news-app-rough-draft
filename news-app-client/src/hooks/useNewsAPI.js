import { useState, useReducer } from "react";
import { fetchNews } from "../lib";


// this is the hypothetical requestObject
// const requestObjsect = {
//     endpoint: 'everything',
//     apiKey: "your_api_key_here",
//     country: "us",
//     category: "technology",
//     sources: "cnn,bbc-news",
//     q: "artificial intelligence",
//     pageSize: 20,
//     page: 1
//   }
  


const useNewsAPI = (requestObject) =>{
    const [everything,setEverything] = useState('https://newsapi.org/v2/everything?')
    const [topHeadlines,setTopHeadlines] = useState('https://newsapi.org/v2/top-headlines?')
    const [query,setQuery] = useState(`q=${requestObject.query}`)


    // let url = everything;

    // const news = fetchNews(url)


    // 'https://newsapi.org/v2/everything?q=trump&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`

}

export default useNewsAPI;