import React from "react";
import axios from "axios";
import '../../index.css';
const stickerPackStore = ({pacprodId, image ,name}) => {
    const invId = parseInt(localStorage.getItem('invId'));
    const handleOpen = () => {
        
        axios.post(`http://localhost:3030/openpack/`, {
          pacprodId: pacprodId,
          invId: invId
        })
        .then(response => {
            console.log(pacprodId);
            console.log(invId);
        alert("Você acabou de abrir o pacote, dê uma olhada nas suas novas figurinhas!")
        console.log(response.data)
        //alguma alteração relacionada ao reload
        window.location.reload();
        })
        .catch(error => {
          console.log(error);
          alert("Ocorreu um erro ao abrir o pacote");
        });
    }
    return(
        <div className="stickerPack">
            <img src={image} alt = {name}/>
            <h3>{name}</h3>
            <button onClick={handleOpen}>Abrir</button>
            <button onClick={}>Abrir todos</button>

        
        </div>

    );
}   
export default stickerPackStore;