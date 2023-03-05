import './App.css';
import React from 'react';
import  {Login}  from './pages/Authentication/Login'
import {Routes, Route} from 'react-router-dom';
import { Loja } from './pages/loja/Loja';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='loja' element={<Loja/>}></Route>
    
    </Routes>
  );

}

export default App;
