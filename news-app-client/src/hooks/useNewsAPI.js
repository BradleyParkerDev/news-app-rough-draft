import { useState, useReducer } from "react";
import { fetchNews,  } from "../lib";


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




const categories  = ['business','entertainment','general','health','science','sports','technology']

const useNewsAPI = async (input) =>{

    const [everything,setEverything] = useState('https://newsapi.org/v2/everything?')
    const [topHeadlines,setTopHeadlines] = useState('https://newsapi.org/v2/top-headlines?')

    // if (input)
    // const categoriesArr = arr.map((item)=>{
    //     let category = newsObject();
    //     category.name = item;
    //     category.searchPreferences.category = item;
    //     category.country = 'us'
    // })

    fetchNews()

}

export default useNewsAPI;