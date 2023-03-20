import React from 'react';
import Navbar from '../Components/Navbar';
import TradeCardGrid from '../Components/TradeCardGrid';
import './Style.css';

export function Trade(){
    return(
        <div>
        <Navbar />
        <TradeCardGrid/>
        </div>
    )
}

export default Trade;
