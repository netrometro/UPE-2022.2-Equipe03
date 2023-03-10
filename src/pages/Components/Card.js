import React from "react";
import axios from "axios";

const Card = ({id, image, name, price}) => {
    const email = localStorage.getItem('email');
    const handleBuy = () => {
        if (!email) {
            alert('Você deve estar logado para realizar a compra');
            return;
          }
        axios.post("http://localhost:3030/usuario", {
          email: email,
          id: id
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