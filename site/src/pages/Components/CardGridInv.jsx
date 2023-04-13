import React, { useState, useEffect } from "react";
import Card from "./CardInv";
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
        console.log(response)
        setCards(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });

    Axios
      .get(`http://localhost:3030/inventario/Pac/${invId}`)
      .then((response) => {
        setStickerPack(response.data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (!cards|| !stickerPack || (cards.length === 0 && stickerPack.length === 0)) {
    return <p className="Alert">Você não tem figurinhas</p>;
  }

  if (!cards || !stickerPack ||(cards.length === 0 && stickerPack.length === 0)) {
    return <p className="Alert">Você não tem figurinhas</p>;
  }


  return (
    <div className="card-grid">
      {stickerPack && stickerPack.map((pack) => (
      <StickerPackInv key={pack.pacprodId} pacprodId={pack.pacprodId} image={pack.image} name={pack.name} price={pack.price}/>
    ))}
      {Array.isArray(cards) && cards.map((card) => (
        <Card prodId={card.prodId} image={card.image} name={card.name} />
      ))}
    </div>
  );
};

export default CardGridInv;
