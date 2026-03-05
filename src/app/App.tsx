import React from 'react';
import './App.css';
import Layout from 'src/app/layout/layout';
import AppRouter from 'src/app/router/app-router/app-router';

function App() {
  return (
    <div className="App">
      <Layout>
        <AppRouter />
      </Layout>
    </div>
  );
}

export default App;
