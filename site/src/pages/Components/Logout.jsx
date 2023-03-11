import React from 'react';
import '../../index.css';
import { useNavigate } from 'react-router-dom';
export function Logout() {
    const navigate = useNavigate();
    function sair (){
        localStorage.removeItem('userId');
        localStorage.removeItem('invId');
        alert("Deslogado")
        navigate('/')

    }
    return (
      <div>
        <button className='button2' onClick={sair}>Sair</button>
      </div>
    )
}

export default Logout;