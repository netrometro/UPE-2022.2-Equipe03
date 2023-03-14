import React from "react";
import Axios from "axios";
import {update} from "react-router-dom";



const Button = () => {
    const userId = localStorage.getItem('userId');
    const DailyButton = () =>{
        if (!userId){

        }
        Axios.update("http://localhost:3030/daily", {
            money: 10
        })

    }
    return(
        <button onClick={DailyButton}>Collect your daily coins</button>
    );

}
