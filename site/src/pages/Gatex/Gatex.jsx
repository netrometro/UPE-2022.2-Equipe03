import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import './Style.css';
import Axios from "axios";
import Card from '../Components/Card'



const Gatex = () => {
    const [cards, setCards] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
  
    useEffect(() => {
      console.log("Fetching cards...");
      Axios
        .get("http://localhost:3030/gatex")
        .then((response) => {
            setCards(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    const filteredCards = cards.filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()))
  
    return (
      <div>
        <Navbar/>
        <div className='search-bar'>
                <input 
                type="text" 
                placeholder='Search...' 
                onChange={event => 
                 {setSearchTerm(event.target.value)
                 }}
                 />
                <div className='card-grid'>
                    {filteredCards.map((card) => (
                        <Card gatId={card.gatId} image={card.image} name={card.name} price={card.price}/>
                    )   
                    )}
                </div>
        </div>
      </div>
    );
  };  
  
  export default Gatex;
  
