import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';

import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<></>} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
