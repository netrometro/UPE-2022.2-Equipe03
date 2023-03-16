import React from "react";

const CardGatex = ({image, name, type, desc}) => {
  let textColor;
  let bgColor;
  switch (type) {
    case "Legendary":
      textColor = "white";
      bgColor= "purple";
      break;
    case "Epic":
      textColor = "green";
      bgColor = "orange";
      break;
    case "Rare":
      textColor = "#ffff64";
      bgColor = "#64b2ff";
      break;
    case "Common":
      textColor = "#876852";
      bgColor = "#CBD6C8";
      break;
    default:
      textColor = "black";
      bgColor = "#CBD6C8";
  }

  const typeStyle = { color: textColor };
  const cardStyle = { backgroundColor: bgColor };

  return (
    <div className="cardGatex" data-description={desc} style={cardStyle}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <h4 style={typeStyle}>{type}</h4>
    </div>
  );
};

export default CardGatex;
