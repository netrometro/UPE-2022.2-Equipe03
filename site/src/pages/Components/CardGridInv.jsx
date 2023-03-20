import React, { useState, useEffect } from "react";
import Card from "./Card";
import '../../index.css';
import Axios from "axios";
import StickerPackInv from "./StickerPackInv"
const invId = localStorage.getItem('invId');

const CardGridInv = () => {
  const [cards, setCards] = useState([]);
  const [stickerPack, setStickerPack] = useState(null);

  useEffect(() => {
    console.log("Fetching cards...");
    Axios
      .get(`http://localhost:3030/inventario/${invId}`)
      .then((response) => {
        setCards(response.data.reverse());
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

    Axios
      .get(`http://localhost:3030/inventario/Pac/${invId}`)
      .then((response) => {
        setStickerPack(response.data.reverse());
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="card-grid">
      {stickerPack && stickerPack.map((pack) => (
      <StickerPackInv key={pack.pacprodId} pacprodId={pack.pacprodId} image={pack.image} name={pack.name} price={pack.price}/>
    ))}
      {Array.isArray(cards) && cards.map((card) => (
        <Card gatId={card.gatId} image={card.image} name={card.name} price={card.price} />
      ))}
    </div>
  );
};

export default CardGridInv;
