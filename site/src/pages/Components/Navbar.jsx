import React from 'react';
import {Link} from 'react-router-dom';
import '../../index.css';
import Logout from './Logout';

export const Navbar = () => {
    return (
        <header>
        <div className="logo">
            <img src="https://media.discordapp.net/attachments/1081023068358590586/1081023228631318579/nome-removebg-preview.png" alt="Gaturinhas" draggable="false"></img>
        </div>
        <div class="topbar">
            <nav class="navbar">
                <nav>
                    <ul class="nav-bar">
                    <li class="nav-item"><Link to ='/gatex'>Gatex</Link></li>
                            <li class="nav-item"><Link to='/store'>Store</Link></li>
                            <li class="nav-item"><Link to='/inventory'>Inventory</Link></li>
                            <li class="nav-item"><Link to='/trade'>Trade</Link></li>
                            <li class="nav-item"><Link to='/settings'>Settings</Link></li>
                            <li class="nav-item"><Logout/></li>
                            
                    </ul>
                </nav>
            </nav>
        </div>
    </header>
    )
}

export default Navbar;