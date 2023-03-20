import React from "react";
import '../../index.css';
const Card = ({amount ,gatId, image, name}) => {
    const handleTrade = () => {
    
      };
    return(
        <div className="card">
            
            <img src={image} alt = {name}/>
            <h3>{name}</h3>
            <p>Duplicate cards : {amount}</p>
            <button onClick={handleTrade}>Trade</button>
        </div>

    );
}
export default Card;