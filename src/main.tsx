import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu from './pages/Menu/Menu.jsx';
import Cart from './pages/Cart/Cart.tsx';
import MenuLayout from './layout/Menu/MenuLayout.tsx';
import Product from './pages/Product/Product.tsx';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';
import AuthLayout from './layout/Auth/AuthLayout.tsx';
import Login from './pages/Login/Login.tsx';
import Register from './pages/Register/Register.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store/store.ts';
import RequireAuth from './helpers/RequireAuth.tsx';
import Success from './pages/Success/Success.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <MenuLayout />
      </RequireAuth>
    ),
    children: [
      { path: '/', element: <Menu /> },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/product/:id',
        errorElement: <div>Ошибка</div>,
        element: <Product />,
        loader: async ({ params }) => {
          const { data } = await axios.get(`${PREFIX}/products`);
          const arr = [];
          //@ts-ignore
          const item = data.find((el) => el.id === +params.id);
          if (item) {
            arr.push(item);
          }
          return arr;
        },
      },
      { path: '/success', element: <Success /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
