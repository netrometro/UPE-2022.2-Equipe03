import React from "react";

const CardGatex = ({image, name, type, desc}) => {
    return(
        <div className="cardGatex" data-description={desc}>
            
            <img src={image} alt = {name}/>
            <h3>{name}</h3>
            <h4>{type}</h4>
        </div>

    );
}

export default CardGatex;