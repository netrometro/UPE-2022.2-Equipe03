import React, {useState, useEffect}from "react";
import Axios from "axios";
import audioFile from "../.././Assets/GatinhoAlimentado.mp3";

export function Button() {
  const [disabled, setDisabled] = useState(false);
  const [audio] = useState(new Audio(audioFile));

  useEffect(() => {
    const userId = parseInt(localStorage.getItem("userId"));
    console.log(userId)
    if (!userId) {
      return;
    }
    Axios.get(`http://localhost:3030/album/${userId}/lastClickedDate`)
      .then((response) => {
        const lastClickedDate = response.data.catFed;
        const today = new Date().toISOString().slice(0, 10);

        if (!lastClickedDate || (lastClickedDate !== today)) {
          setDisabled(false);
        } else{
          setDisabled(true)
        }
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const feedCats = () => {
    const userId = parseInt(localStorage.getItem("userId"));
    if (!userId) {
      return;
    }
    
    Axios.put(`http://localhost:3030/album/feed/${userId}`)
    .then((response) => {
        if (response.data === true){
            audio.play();
            alert("Gatinhos Alimentados!");

            setDisabled(true);
            const today = new Date().toISOString().slice(0, 10);
            Axios.put(`http://localhost:3030/album/${userId}/UpdatelastClickedDate`, { catFed: today });
        } else {
            alert ("Gaturinhas Insuficientes para alimentar!")
        }
    })
    .catch((error) => {
      console.error(error);
    });
};

  return (<div className="dailyButton"><button disabled={disabled}
    onClick={feedCats}>
      Alimentar Gatinhos
    </button></div>);
}

export default Button;