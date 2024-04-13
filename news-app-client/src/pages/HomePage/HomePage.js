import React, { useContext } from 'react';
import { useState, useEffect } from 'react'; // Assuming you will use useState and useEffect later
import { NewsContext } from '../../context/NewsContext';
import { UserContext } from '../../context/UserContext';


const HomePage = (props) => {
    const { state: news } = useContext(NewsContext);
    const { topHeadlines, categories } = news;

    const renderArticles = (articles) => {
        return (
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        <a href={article.url}>{article.title}</a>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            <h1>Top Headlines</h1>
            {topHeadlines.loadingTopHeadlines ? (
                <p>Loading Top Headlines...</p>
            ) : (
                renderArticles(topHeadlines.articles)
            )}

            <h1>Categories</h1>
            {Object.values(categories).map(category => (
                <div key={category.name}>
                    <h2>{category.name}</h2>
                    {category.loadingCategory ? (
                        <p>Loading {category.name} articles...</p>
                    ) : (
                        renderArticles(category.articles)
                    )}
                </div>
            ))}
        </div>
    );
};

export default HomePage;





// const HomePage = (props) => {

//     const { state: news } = useContext(NewsContext);
//     const { state: user, dispatch: userDispatch, setUserData } = useContext(UserContext);
//     const { topHeadlines, query } = news;
//     const { business, entertainment, general, health, science, sports, technology } = news.categories;

//     const showTopHeadlines = async () => {
//         return (
//             <div>
//                 <ul>
//                     {topHeadlines.articles.map((article, index) => (
//                         <li key={index}>
//                             <a href={article.url}>{article.title}</a>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         );
//     };

//     const showCategories = async () =>{
//         return (
//             <div>
//                 <ul>
//                     {topHeadlines.articles.map((article, index) => (
//                         <li key={index}>
//                             <a href={article.url}>{article.title}</a>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         );
//     }
//     return (
//         <div>
//             <h1>Top Headlines</h1>
//             {topHeadlines.loadingTopHeadlines ? (
//                 <p>Loading Top Headlines...</p>
//             ) : (
//                 showTopHeadlines()
//             )}
//         </div>
//     );
// };

// export default HomePage;
