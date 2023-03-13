import React from "react";

const CardGatex = ({gatId, image, name, price, type}) => {
    return(
        <div className="card">
            
            <img src={image} alt = {name}/>
            <h3>{name}</h3>
            <h4>{type}</h4>
        </div>

    );
}

export default CardGatex;