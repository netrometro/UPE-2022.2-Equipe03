import React, { useState, useEffect } from "react";
import '../../index.css';
import Axios from "axios";
import Card from "./CardTrade"
const invId = localStorage.getItem('invId');

const TradeCardGrid = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    console.log("Fetching cards...");
    Axios
      .get(`http://localhost:3030/trade/${invId}`)
      .then((response) => {
        setCards(response.data);
        console.log(response.data);
        console.log(invId);
      })
      .catch((error) => {
        console.log(error);
        console.log(invId);
      });
  }, []);

  return (
    <div className="card-grid">
      {Array.isArray(cards) && cards.map((card) => (
        <Card gatId={card.gatId} image={card.image} name={card.name} amount={card.amount} />
      ))}
    </div>
  );
};

export default TradeCardGrid;
