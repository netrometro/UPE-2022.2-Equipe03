import './Style.css';
import Navbar from '../Components/Navbar';
import CardGrid from '../Components/CardGrid';

import React, { useState, useEffect } from 'react';
import axios from 'axios';


export function Store(){
    const invId = localStorage.getItem('invId');
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:3030/usuario/'+ invId + '/money')
          .then(response => {
            setUser(response.data);
            
            
            

          })
          .catch(error => {
            console.log(error);
          });
      }, [invId]);

    return(
        <>
    <Navbar/>
    {user && <p>Gatomoedas: {user.money}</p>}
    <CardGrid/>
    </>
    );
}

export default Store;