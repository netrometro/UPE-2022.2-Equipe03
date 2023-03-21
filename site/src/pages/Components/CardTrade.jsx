import React from "react";
import '../../index.css';
import axios from 'axios';
const Card = ({amount , image, name, prodIds}) => {
    const invId = parseInt(localStorage.getItem('invId'));
    const handleTrade = () => {
        axios.post(`http://localhost:3030/tradeCards`, {
         prodIds: prodIds,
         invId: invId
        })
        .then(response => {
        alert("Você trocou as suas figurinhas repetidas! Vá até seu inventário ver que figurinha você ganhou")
        console.log(response.data);
        window.location.reload();

        })
        .catch(error => {
          console.log(error);
          alert("Ocorreu um erro ao trocar as figurinhas");
        });
      };
    return(
        <div className="card">
            
            <img src={image} alt = {name}/>
            <h3>{name}</h3>
            <p>Duplicate cards : {amount}</p>
            <button onClick={handleTrade}>Trade 5 cards</button>
        </div>

    );
}
export default Card;