import React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import '../../index.css';
const stickerPackStore = ({pacId, image ,name}) => {
    const email = localStorage.getItem('email');
    const handleOpen = () => {}
    return(
        <div className="stickerPack">
            <img src={image} alt = {name}/>
            <h3>{name}</h3>
            <button onClick={handleOpen}>Abrir</button>
        
        </div>

    );
}
export default stickerPackStore;