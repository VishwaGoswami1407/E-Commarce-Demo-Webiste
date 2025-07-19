import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Default from './Pages/Default'
import Landing from './components/Landing'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'
import { PrivateRoute, PublicRoute } from './components/RouteGuards'
import Products from './Pages/Products'
import AddProduct from './Pages/AddProduct'
import EditProduct from './Pages/EditProduct'
import Cart from './Pages/Cart'

import Success from './pages/Succes'
import Cancel from './Pages/Cancel'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Default />,
    children: [
      {
        path: '/',
        element: <Landing />
      },
      {
        path: '/home',
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        )
      },
      {
        path: '/login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        )
      },
      {
        path: '/register',
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        )
      },
      {
        path: '/products',
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        )
      },
      {
        path: '/product/add',
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        )
      },
      {
        path: '/cart',
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        )
      },
      {
    path: '/products/edit/:id',  // ✅ Newly added route
    element: (
      <PrivateRoute>
        <EditProduct />
      </PrivateRoute>
    )
  },  
  {
    path: '/success',  // ✅ Newly added route
    element: (
      <PrivateRoute>
        <Success />
      </PrivateRoute>
    )
  },
  {
    path: '/cancel',  // ✅ Newly added route
    element: (
      <PrivateRoute>
        <Cancel />
      </PrivateRoute>
    )
  },
    ]
  }
]);



function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App