import React from 'react';
import '../../index.css';
import { useNavigate } from 'react-router-dom';

const invId = localStorage.getItem('invId');
const userId = localStorage.getItem('userId');
export function Logout() {
    const navigate = useNavigate();
    function sair (){
        localStorage.removeItem('userId');
        localStorage.removeItem('invId');
        alert("Deslogado")
        navigate('/');
        window.location.reload();
        console.log(userId);
        console.log(invId);
        
    }
    return (
      <div>
        <button className='button2' onClick={sair}>Logout</button>
      </div>
    )
}

export default Logout;