import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import './Style.css';

class Gatex extends Component {
    render() {
        return (
            <div>
               <Navbar/>
               <div className='search-bar'>
                <input type="text" placeholder='Search...'></input>
               </div>
            </div>
        );
    }
}

export default Gatex;

