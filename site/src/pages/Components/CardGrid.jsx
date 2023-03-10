import React from "react";
import Card from "./Card"
import '../../index.css';
const cards = [
    {
        gatId: 1,
        name: "Gatinho 1",
        price: 10,
        image: "https://cdn.discordapp.com/attachments/440326168491720705/1082052004223926393/5nrrj5v91gj11.jpg"

    },
    {
        gatId: 2,
        name: "Gatinho 2",
        price: 20,
        image: "https://cdn.discordapp.com/attachments/440326168491720705/1082052004936945786/asdfg.png"
    },
    {
        gatId: 3,
        name: "Gatinho 3",
        price: 30,
        image: "https://cdn.discordapp.com/attachments/440326168491720705/1082052005184421899/asdf.png"
    }, 
    {
      gatId: 4,
      name: "Gatinho 4",
      price: 40,
      image: "https://cdn.discordapp.com/attachments/440326168491720705/1082052911061798943/123.png"
    },
    {
      gatId: 4,
      name: "Gatinho 5",
      price: 50,
      image: "https://cdn.discordapp.com/attachments/440326168491720705/1082053180835241994/image.png"
    },
    {
      gatId: 4,
      name: "Gatinho 5",
      price: 50,
      image: "https://cdn.discordapp.com/attachments/440326168491720705/1082053180835241994/image.png"
    },
    {
      gatId: 4,
      name: "Gatinho 5",
      price: 50,
      image: "https://cdn.discordapp.com/attachments/440326168491720705/1082053180835241994/image.png"
    }
    ,
    {
      gatId: 4,
      name: "Gatinho 5",
      price: 50,
      image: "https://cdn.discordapp.com/attachments/440326168491720705/1082053180835241994/image.png"
    },
    {
      gatId: 4,
      name: "Gatinho 5",
      price: 50,
      image: "https://cdn.discordapp.com/attachments/440326168491720705/1082053180835241994/image.png"
    },
    {
      gatId: 4,
      name: "Gatinho 5",
      price: 50,
      image: "https://cdn.discordapp.com/attachments/440326168491720705/1082053180835241994/image.png"
    },
    {
      gatId: 4,
      name: "Gatinho 5",
      price: 50,
      image: "https://cdn.discordapp.com/attachments/440326168491720705/1082053180835241994/image.png"
    },
    {
      gatId: 4,
      name: "Gatinho 5",
      price: 50,
      image: "https://cdn.discordapp.com/attachments/440326168491720705/1082053180835241994/image.png"
    }

];

const CardGrid = () => {
    return (
      <div className="card-grid">
        {cards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    );
  };

  export default CardGrid;