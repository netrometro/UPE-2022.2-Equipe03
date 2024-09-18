import React, {useState} from "react";
import "../../index.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import audioFile from "../.././Assets/GatoVendido.mp3";

export function SellAlbumButton() {
  const [audio] = useState(new Audio(audioFile));
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const venderAlbum = () => {
    Axios.post("http://localhost:3030/album/sell", {
      userId: userId,
    }).then((response) => {
      console.log(response);
      if (response.data === true) {
        audio.play();
        alert("Album vendido!");
        navigate("/album");
        window.location.reload();
      } else if (response.data.msg === "Gaturinhas insuficientes para vender"){
        alert("Gaturinhas insuficientes para vender o album!");
      } else {
        alert("Album não encontrado ou vazio");
      }
    });
  };
  return (
    <div>
      <button className="button2" onClick={venderAlbum}>
        Vender Album
      </button>
    </div>
  );
}

export default SellAlbumButton;
