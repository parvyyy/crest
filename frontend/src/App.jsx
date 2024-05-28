import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';

import './index.css';

export const TokenContext = React.createContext(null);

function App() {
  const [token, setToken] = React.useState('')
  const updateToken = (tok) => {
    setToken(tok)
    localStorage.setItem('token', tok)

    if (!tok) {
      localStorage.removeItem('token')
    }
  }

  // On startup, registers token
  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  return (
    <TokenContext.Provider value = {{ token, updateToken }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  );
}

export default App;
