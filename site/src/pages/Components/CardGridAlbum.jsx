import React, { useState, useEffect } from "react";
import Card from "./Card"
import '../../index.css';
import Axios from "axios";
const userId = localStorage.getItem('userId');

const CardGridAlbum = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    console.log("Fetching cards...");
    Axios
      .get("http://localhost:3030/album/"+userId)
      .then((response) => {
        setCards(response.data);
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="card-grid">
      {Array.isArray(cards) && cards.map((card) => (
        <Card gatId={card.gatId} image={card.image} name={card.name} price={card.price} />
      ))}
    </div>
  );
};  

export default CardGridAlbum;
