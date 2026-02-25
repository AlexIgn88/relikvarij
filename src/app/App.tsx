import React from 'react';
import './App.css';

import { APP_ROUTES } from 'src/app/routes';
import Layout from 'src/common/layout/layout';
import HomeScreen from 'src/pages/home-screen/home-screen';
import ProfileScreen from 'src/pages/profile-screen/profile-screen';
import { Route, Routes } from 'react-router-dom';
import ItemsScreen from 'src/pages/items-screen/items-screen';
import ShoppingCartScreen from 'src/pages/shopping-cart-screen/shopping-cart-screen';
import ProtectedRoute from './protected-route';
import LoginScreen from 'src/pages/login-screen/login-screen';
import SignupReduxThunkScreen from 'src/pages/signup-redux-thunk-screen/signup-redux-thunk-screen';
import SignupReduxSagaScreen from 'src/pages/signup-redux-saga-screen/signup-redux-saga-screen';
import SignupReduxToolkitQueryScreen from 'src/pages/signup-redux-toolkit-query-screen/signup-redux-toolkit-query-screen';
import SignupScreen from 'src/pages/signup-screen/signup-screen';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path={APP_ROUTES.INDEX} element={<HomeScreen />} />
          <Route path={APP_ROUTES.LOGIN} element={<LoginScreen />} />
          <Route path={APP_ROUTES.SIGNUP_FUNCTIONAL_COMPONENT_SCREEN} element={<SignupScreen />} />
          <Route path={APP_ROUTES.SIGNUP_REDUX_THUNK_SCREEN} element={<SignupReduxThunkScreen />} />
          <Route path={APP_ROUTES.SIGNUP_REDUX_SAGA_SCREEN} element={<SignupReduxSagaScreen />} />
          <Route path={APP_ROUTES.SIGNUP_REDUX_TOOLKIT_QUERY_SCREEN} element={<SignupReduxToolkitQueryScreen />} />
          <Route
            path={APP_ROUTES.PROFILE}
            element={
              <ProtectedRoute>
                <ProfileScreen />
              </ProtectedRoute>
            }
          />
          <Route path={APP_ROUTES.PRODUCTS} element={<ItemsScreen />} />
          <Route
            path={APP_ROUTES.CART}
            element={
              <ProtectedRoute>
                <ShoppingCartScreen />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
