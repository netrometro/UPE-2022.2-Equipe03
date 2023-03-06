import React from "react";
import axios from "axios";

const Card = ({id, image, name, price}) => {
    const handleBuy = () => {
        axios.post("http://localhost:3030/usuario", {
          name: name,
          price: price,
        })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
      };
    return(
        <div className="card">
            <img src={image} alt = {name}/>
            <h3>{name}</h3>
            <p>{price}</p>
            <button onClick={handleBuy}>Buy</button>
        </div>

    );
}
export default Card;