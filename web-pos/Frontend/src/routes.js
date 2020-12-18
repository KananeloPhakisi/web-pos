import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import AddProduct from 'src/views/product/ProductListView/AddProduct';
import DeleteProduct from 'src/views/product/ProductListView/DeleteProduct';
import UpdateProduct from 'src/views/product/ProductListView/UpdateProduct';
import SellProduct from 'src/views/product/ProductListView/SellProduct';
import SellHistory from 'src/views/product/ProductListView/SellHistory';
import RegisterView from 'src/views/auth/RegisterView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'addProduct', element: <AddProduct /> },
      { path: 'deleteProduct', element: <DeleteProduct /> },
      { path: 'updateProduct', element: <UpdateProduct />},
      { path: 'sellProduct', element: <SellProduct />},
      { path: 'sellHistory', element: <SellHistory />},
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
