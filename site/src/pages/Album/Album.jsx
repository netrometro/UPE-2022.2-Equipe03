import "../Album/Style.css";
import Navbar from "../Components/Navbar";
import CardGridAlbum from "../Components/CardGridAlbum";
import CreateAlbumButton from "../Components/CreateAlbumButton";
import React from "react";
import SellAlbumButton from "../Components/SellAlbumButton";

export function Album() {
  return (
    <div>
      <Navbar />
      <div className="create-sell">
        <CreateAlbumButton />
        <SellAlbumButton />
      </div>
      <CardGridAlbum />
      <div></div>
    </div>
  );
}

export default Album;
