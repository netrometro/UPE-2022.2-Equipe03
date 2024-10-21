import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import '../../index.css';
const Card = ({prodId, image, name}) => {
    const userId = parseInt (localStorage.getItem('userId'));
    const colar = () => {
        if (!userId) {
            alert('Você deve estar logado para colar');
            Navigate('/')
          }
        axios.put(`http://localhost:3030/album/stick/${userId}`, {
          prodId: prodId,
        })
        .then(response => {
          if (response.data === false){ 
            alert("Não foi possível colar a figurinha")
          }
          else{
            alert("Colado!")
          }
          console.log(response.data)
          window.location.reload();
          
        })
        .catch(error => {
          console.log(error);
          alert("Ocorreu um erro ao realizar a colagem");
        });
      };

      // const vender = () => {
      //   if (!userId) {
      //       alert('Você deve estar logado para vender');
      //       Navigate('/')
      //     }
      //   axios.put(`http://localhost:3030/album/stick/${userId}`, {
      //     prodId: prodId,
      //   })
      //   .then(response => {
      //     if (response.data === false){ 
      //       alert("Não foi possível colar a figurinha")
      //     }
      //     else{
      //       alert("Colado!")
      //     }
      //     console.log(response.data)
      //     window.location.reload();
          
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     alert("Ocorreu um erro ao realizar a colagem");
      //   });
      // };

    return(
        <div className="card">
            
            <img src={image} alt = {name}/>
            <h3>{name}</h3>
            <button onClick={colar}>Stick</button>
            {/* <button onClick={vender}>Sell</button> */}
        </div>

    );
}
export default Card;