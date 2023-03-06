import React from 'react';
import {Link} from 'react-router-dom';
import '../../index.css';
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
                    <li class="nav-item"><Link to ='/'>Gatex</Link></li>
                            <li class="nav-item"><Link to='/Store'>Store</Link></li>
                            <li class="nav-item"><Link to='/Inventory'>Inventory</Link></li>
                            <li class="nav-item"><Link to='/Settings'>Settings</Link></li>
                    </ul>
                </nav>
            </nav>
        </div>
    </header>
    )
}

export default Navbar;