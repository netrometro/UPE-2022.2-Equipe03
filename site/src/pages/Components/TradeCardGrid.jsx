import React, { useState, useEffect } from "react";
import '../../index.css';
import Axios from "axios";
import Card from "./CardTrade"
const invId = localStorage.getItem('invId');

const TradeCardGrid = () => {
  const [cards, setCards] = useState([]);
  const [prodId, setProdId] = useState([])

  useEffect(() => {
    console.log("Fetching cards...");
    Axios
      .get(`http://localhost:3030/trade/${invId}`)
      .then((response) => {
        setCards(response.data);
        setProdId(response.data[0].prodIds);
        console.log(response.data[0].prodIds);
      })
      .catch((error) => {
        console.log(error);

      });
  }, []);
  if (cards.length === 0) {
    return <p className="Alert">No momento você não tem 5 ou mais figurinhas repetidas</p>;
  }

  return (
    <div className="card-grid">
     {Array.isArray(cards) && cards.map((card, index) => (
  <Card key={card.gatId || index} gatId={card.gatId} image={card.image} name={card.name} amount={card.amount} prodIds={card.prodIds}/>
))}

    </div>
  );
};

export default TradeCardGrid;
