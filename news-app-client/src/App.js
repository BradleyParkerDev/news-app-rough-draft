//comment
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Layout from '../src/layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import UserPage from './pages/UserPage/UserPage';


const App = () => {
	const router = createBrowserRouter([{
		path:'/',
		element: <Layout/>,
		children: [
			{
				index:true,
				element:<HomePage/>
			},
			{
				path: '/user-page',
				element: <UserPage/>
			}
		]
	}])
	return(
		<div>
			<RouterProvider router={router}/>
		</div>
	)
    
};

export default App;