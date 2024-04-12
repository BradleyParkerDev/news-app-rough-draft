import axios from "axios";

const fetchNews = async(newsObj, state, dispatch) => {

    if(!newsObj.query){
        if(newsObj.name === 'top-headlines'){
            const url = `https://newsapi.org/v2/top-headlines?country=${newsObj.country}`
            
            try {
                // console.log('fetching news...')
                const newsResponse = await axios.get(`${url}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
                return newsResponse.data.articles 
            } catch (error) {
                console.error('Error fetching news:', error);
            }

        }


        if(newsObj.name !== 'top-headlines'){

            const url = `https://newsapi.org/v2/top-headlines?country=${newsObj.country}&category=${newsObj.name}`

            try {
                // console.log('fetching news...')
                const newsResponse = await axios.get(`${url}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
                return newsResponse.data.articles 
            } catch (error) {
                console.error('Error fetching news:', error);
            }

        }        
    }


    if(newsObj.query){
        if(newsObj.endpoint === 'top-headlines'){


        }
        if(newsObj.endpoint === 'everything'){

            
        }
        const url = `https://newsapi.org/v2/top-headlines?country=${newsObj.country}&category=${newsObj.name}`

        try {
            // console.log('fetching news...')
            const newsResponse = await axios.get(`${url}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
            return newsResponse.data.articles 
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }

}

export default fetchNews;
