import React from "react";
import Axios from "axios";

export function Button() {

  const handleCollectReward = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      return;
    }
    Axios.put('http://localhost:3030/daily/'+ userId, { money: 10 })
      .then((response) => {
        console.log(response);
        alert('coins obtained');
        
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (<div className="dailyButton"><button
    onClick={handleCollectReward}>
      Collect your daily coins
    </button></div>);
}

export default Button;
