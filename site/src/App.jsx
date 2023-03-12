import './App.css';
import React from 'react';
import  {Login}  from './pages/Authentication/Login'
import {Routes, Route} from 'react-router-dom';
import Store from './pages/Store/Store';
import Home from './pages/Home/Home';
import Inventory from './pages/Invetory/Inventory';
import Trade from './pages/Trade/Trade'
import Settings from './pages/Settings/settings';
import Gatex from './pages/Gatex/Gatex'
function App() {
  return (
    
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/store' element={<Store/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/inventory' element={<Inventory/>}></Route>
      <Route path='/trade' element={<Trade/>}></Route>
      <Route path='/settings' element={<Settings/>}></Route>
      <Route path='/gatex' element={<Gatex/>}></Route>
        
     
    
    </Routes>
  );

}

export default App;
