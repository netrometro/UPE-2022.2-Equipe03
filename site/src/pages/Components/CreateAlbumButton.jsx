import React from 'react';
import '../../index.css';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

export function CreateAlbumButton() {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const criarAlbum = () => {
    Axios.post('http://localhost:3030/album/create', {
      userId: userId,
    }).then((response) => {
      console.log(response);
      if (response.data === true) {
        alert('Album criado com Sucesso!');
        navigate('/album');
        window.location.reload();
      } else {
        alert('Você já tem um Album');
      }
    });
  };
    return (
      <div>
        <button className='button2' onClick={criarAlbum}>Criar Album</button>
      </div>
    )
}

export default CreateAlbumButton;