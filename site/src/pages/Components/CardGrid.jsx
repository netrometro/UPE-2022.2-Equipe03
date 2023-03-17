import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import StickerPackStore from "./StickerPackStore";
import "../../index.css";

const Grid = () => {
  const [cards, setCards] = useState([]);
  const [stickerPacks, setStickerPacks] = useState([]);

  useEffect(() => {
    console.log("Fetching cards and sticker packs...");
    const cardPromise = axios.get("http://localhost:3030/gatex");
    const stickerPackPromise = axios.get("http://localhost:3030/stickerPackStore");
    Promise.all([cardPromise, stickerPackPromise])
      .then(([cardResponse, stickerPackResponse]) => {
        const commonCards = cardResponse.data.filter((card) => card.type === "Common");
        setCards(commonCards);
        setStickerPacks(stickerPackResponse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card key={card.gatId} gatId={card.gatId} image={card.image} name={card.name} price={card.price} />
      ))}
      {stickerPacks.map((pack) => (
        <StickerPackStore key={pack.pacId} pacId={pack.pacId} image={pack.image} name={pack.name} price={pack.price} />
      ))}
    </div>
  );
};

export default Grid;
