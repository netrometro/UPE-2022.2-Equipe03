import React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import '../../index.css';
const stickerPackStore = ({pacId, image ,name, price}) => {
    const email = localStorage.getItem('email');
    const handleBuy = () => {
        if (!email) {
            alert('Você deve estar logado para realizar a compra');
            Navigate('/')
          }
        axios.post("http://localhost:3030/compra/Pac", {
          pacId: pacId,
          email: email
        })
        .then(response => {
          if (response.data === false){ 
            alert("Você não tem dinheiro suficiente para esse pacote")
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
        <div className="stickerPack">
            <img src={image} alt = {name}/>
            <h3>{name}</h3>
            <p>{price}</p>
            <button onClick={handleBuy}>Buy</button>
        
        </div>

    );
}
export default stickerPackStore;