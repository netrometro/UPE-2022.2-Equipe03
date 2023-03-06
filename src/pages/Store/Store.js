import './Style.css';
import Navbar from '../Components/Navbar';
import CardGrid from '../Components/CardGrid';

import React, { useState, useEffect } from 'react';
import axios from 'axios';


export function Store(){
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:3030/usuario')
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

    return(
        <>
    <Navbar/>
    <CardGrid/>
    {user && <p>User Money: {user.money}</p>}
    </>
    );
}

export default Store;