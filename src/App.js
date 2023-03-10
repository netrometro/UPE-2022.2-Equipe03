import './App.css';
import React from 'react';
import  {Login}  from './pages/Authentication/Login'
import {Routes, Route} from 'react-router-dom';
import Store from './pages/Store/Store';
import Home from './pages/Home/Home';
function App() {
  return (
    
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/store' element={<Store/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
     
    
    </Routes>
  );

}

export default App;
