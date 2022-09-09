import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Communications from './pages/Communications';
import CommsProvider from './context/CommsProvider';
import './App.css'

class App extends React.Component {
  render() {
    return (
      <CommsProvider>
        <Routes>
          <Route exact path="/" element={ <Communications /> } />
        </Routes>
      </CommsProvider>
    );
  }
}

export default App;
