import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditRocketPage from './pages/EditRocket';
import ErrorPage from './pages/Error';
import RocketDetailPage, {
  loader as RocketDetailLoader,
  action as deleteRocketAction,
} from './pages/RocketDetail';
import RocketsPage, { loader as RocketsLoader } from './pages/Rockets';
import RocketsRootLayout from './pages/RocketsRoot';
import HomePage from './pages/Home';
import NewRocketPage from './pages/NewRocket';
import RootLayout from './pages/Root';
import { action as manipulateRocketAction } from './components/RocketForm';
import AuthenticationPage, { action as authAction } from './pages/Authentication';
import { action as logoutAction } from './pages/Logout';

import { tokenLoader, checkAuthLoader } from './util/auth';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: RocketsLoader,
      },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction
      },
      {
        path: 'rockets',
        element: <RocketsRootLayout />,
        children: [
          {
            index: true,
            id: 'rocket-get-all',
            element: <RocketsPage />,
            loader: RocketsLoader,
            
          },
          {
            path: ':rocketId',
            id: 'rocket-detail',
            loader: RocketDetailLoader,
            children: [
              {
                index: true,
                element: <RocketDetailPage />,
                action: deleteRocketAction,
              },
              {
                path: 'edit',
                element: <EditRocketPage />,
                action: manipulateRocketAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: 'new',
            element: <NewRocketPage />,
            action: manipulateRocketAction,
            loader: checkAuthLoader,
          },
        ],
      }, {
        path: 'logout',
        action: logoutAction
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
