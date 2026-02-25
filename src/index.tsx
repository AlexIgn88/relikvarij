import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/index.css';
import App from './app/App';
import { ThemeProvider } from 'src/app/theming/theme-provider';
import LanguageProvider from 'src/app/localization/language-provider';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppInitializer from './app/appInitializer';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LanguageProvider>
          <ThemeProvider>
            <AppInitializer>
              <App />
            </AppInitializer>
          </ThemeProvider>
        </LanguageProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
