import React from "react";
import axios from "axios";

export function PButton(){


    const CollectPackage = () =>{
        const invId = localStorage.getItem("invId");
        if (!invId){
            return;
        }
        axios.put('http://localhost:3030/dailyP/' + invId, {pac_product})
        .then((response)=> {
            console.log(response);
            alert('cards obtained');


        })
        .catch((error) => {
            console.error(error);
        });
    };

    return (<div className="dailyPButton"><button onClick={CollectPackage}>Collect your daily package</button></div>)
}