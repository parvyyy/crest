import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './pages/Register.tsx';

import './index.css';

type TokenManager = {
  token: string,
  updateToken : (token: string) => void
}

export const TokenContext = React.createContext<TokenManager | null>(null);

function App() {
  const [token, setToken] = React.useState('')
  const updateToken = (tok: string) => {
    setToken(tok)
    localStorage.setItem('token', tok)

    if (!tok) {
      localStorage.removeItem('token')
    }
  }

  // On startup, registers token
  React.useEffect(() => {
    const tok = localStorage.getItem('token')
    if (tok) {
      setToken(tok);
    }
  }, []);

  return (
    <TokenContext.Provider value = {{ token, updateToken }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<>It is working</>} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  );
}

export default App;
