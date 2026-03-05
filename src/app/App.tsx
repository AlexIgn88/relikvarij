import React from 'react';
import './App.css';

import { APP_ROUTES } from 'src/app/routes';
import Layout from 'src/common/layout/layout';
import HomePage from 'src/pages/home-page/home-page';
import ProfilePage from 'src/pages/profile-page/profile-page';
import { Route, Routes } from 'react-router-dom';
import ItemsPage from 'src/pages/items-page/items-page';
import ShoppingCartPage from 'src/pages/shopping-cart-page/shopping-cart-page';
import ProtectedRoute from './protected-route';
import LoginPage from 'src/pages/login-page/login-page';
import SignupPage from 'src/pages/signup-page/signup-page';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path={APP_ROUTES.INDEX} element={<HomePage />} />
          <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={APP_ROUTES.SIGNUP} element={<SignupPage />} />
          <Route
            path={APP_ROUTES.PROFILE}
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path={APP_ROUTES.PRODUCTS} element={<ItemsPage />} />
          <Route
            path={APP_ROUTES.CART}
            element={
              <ProtectedRoute>
                <ShoppingCartPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
