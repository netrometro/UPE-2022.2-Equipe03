import React, {useState, useEffect}from "react";
import Axios from "axios";

export function Button() {
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const invId = localStorage.getItem("invId");
    if (!invId) {
      return;
    }
    Axios.get(`http://localhost:3030/dailyP/${userId}/lastClickedDate`)
      .then((response) => {
        const lastClickedDate = response.data.clickb;
        console.log(lastClickedDate)
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
    const CollectPackage = () =>{
        const userId = localStorage.getItem("userId");
        const invId = localStorage.getItem("invId");
        if (!invId){
            return;
        }
        Axios.put('http://localhost:3030/dailyP/' + invId)
        .then((response)=> {
            console.log(response);
            alert('cards obtained');

      setDisabled(true);
      const today = new Date().toISOString().slice(0, 10);
      console.log(today)
      Axios.put(`http://localhost:3030/dailyP/${userId}/UpdatelastClickedDate`, { clickb: today });
    })
    .catch((error) => {
      console.error(error);
    });
};

  return (<div className="dailyPButton"><button disabled={disabled}
    onClick={CollectPackage}>
      Collect your daily package
    </button></div>);
}

export default Button;