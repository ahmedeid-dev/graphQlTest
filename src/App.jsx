import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProviderComponent } from './lib/Apollo/ApolloClientComponent';
import Login from './pages/Login/Login';
import ShowOne from './pages/ShowOne/ShowOne';
import Users from './pages/Users/Users';
import './App.css';
import AddUser from './pages/AddUser/AddUser';
function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/users',
      element: <Users />
    },
    {
      path: '/users/add',
      element: <AddUser />
    },
    {
      path: '/users/show/:id',
      element: <ShowOne />
    }
  ])
  return <>
    <ApolloProviderComponent>
      <RouterProvider router={router} />
    </ApolloProviderComponent>
  </>
}

export default App
