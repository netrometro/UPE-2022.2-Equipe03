import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import '../../index.css';
const Card = ({gatId, image, name, price}) => {
    const email = localStorage.getItem('email');
    const handleBuy = () => {
        if (!email) {
            alert('Você deve estar logado para realizar a compra');
            Navigate('/')
          }
        axios.post("http://localhost:3030/compra", {
          gatId: gatId,
          email: email
        })
        .then(response => {
          if (response.data === false){ 
            alert("Você não tem dinheiro suficiente para comprar essa figurinha")
          }
          else{
            alert("Compra realizada")
          }
          console.log(response.data)
          window.location.reload();
          
        })
        .catch(error => {
          console.log(error);
          alert("Ocorreu um erro ao realizar a compra");
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