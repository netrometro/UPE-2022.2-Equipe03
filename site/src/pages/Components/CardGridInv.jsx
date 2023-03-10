import React, { useState, useEffect } from "react";
import Card from "./Card"
import '../../index.css';
import Axios from "axios";
const invId = localStorage.getItem('invId');

const CardGridInv = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Axios
      .get("http://localhost:3030/inventario/"+invId)
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};  

export default CardGridInv;
