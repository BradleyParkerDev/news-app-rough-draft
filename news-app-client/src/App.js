//comment
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Layout from '../src/layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';

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
				path: '/settings',
				element: <SettingsPage/>
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