import React, {useState} from "react";
import axios from "axios";

export function PButton(){

    const [disabled, setDisabled] = useState(false);
    const CollectPackage = () =>{
        const invId = localStorage.getItem("invId");
        if (!invId){
            return;
        }
        axios.put('http://localhost:3030/dailyP/' + invId)
        .then((response)=> {
            console.log(response);
            alert('cards obtained');
            setDisabled(true);


        })
        .catch((error) => {
            console.error(error);
        });
    };

    return (<div className="dailyPButton"><button disabled={disabled} onClick={CollectPackage}>Collect your daily package</button></div>)
}

export default PButton;