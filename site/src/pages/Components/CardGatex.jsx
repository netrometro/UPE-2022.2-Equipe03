import React from "react";

const CardGatex = ({image, name, type, desc}) => {
  let textColor;
  switch (type) {
    case "Legendary":
      textColor = "purple";
      break;
    case "Epic":
      textColor = "blue";
      break;
    case "Rare":
      textColor = "green";
      break;
    case "Common":
      textColor = "#876852";
      break;
    default:
      textColor = "black";
  }

  const typeStyle = { color: textColor };

  return (
    <div className="cardGatex" data-description={desc}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <h4 style={typeStyle}>{type}</h4>
    </div>
  );
};

export default CardGatex;
