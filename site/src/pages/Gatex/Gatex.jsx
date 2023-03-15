import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import './Style.css';
import Axios from "axios";
import Card from '../Components/CardGatex'



const Gatex = () => {
    const [cards, setCards] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [sortOrder, setSortOrder] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');

    
  
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

    const filteredCards = cards.filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase())
      || card.type.toLowerCase().includes(searchTerm.toLowerCase()))
   

    const sortedCards = filteredCards.sort((a, b)=> {
      if(sortOrder === 'Rarity') {
        
        const rarityOrder ={ 'Common': 4, 'Rare':3, 'Epic': 2, 'Legendary': 1 };
        if (sortDirection === 'asc'){
          return rarityOrder[a.type] - rarityOrder[b.type];
        } else{
          return rarityOrder[b.type] - rarityOrder[a.type];
        }
      } else{
        if(sortDirection === 'asc'){
          return a.name.localeCompare(b.name);
        }else{
          return b.name.localeCompare(a.name);
        }
      }
    })
    return (
      <div>
        <Navbar/>
        <div>
            <label>
              Sort by:
              <select value={sortOrder} onChange={event => setSortOrder(event.target.value)}>
                            <option value="Rarity">Rarity</option>
                            <option value="name">Name</option>
                        </select>
                    </label>
                    <label>
                        <input type="checkbox" checked={sortDirection === 'desc'} onChange={event => setSortDirection(event.target.checked ? 'desc' : 'asc')} />
                        Reverse order
                    </label>
          </div>
        <div className='search-bar'>
                <input 
                type="text" 
                placeholder='Search...' 
                onChange={event => 
                 {setSearchTerm(event.target.value)
                 }}
                 />
                 </div>
                <div className='card-grid'>
                    {sortedCards.map((card) => (
                        <Card gatId={card.gatId} image={card.image} name={card.name} type={card.type} desc={card.desc}/>
                    )   
                    )}
                </div>
      </div>
    );
  };  
  
  export default Gatex;
  
