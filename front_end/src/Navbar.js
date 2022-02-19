import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";


function Navbar() {
  return (
    <nav>
      <div className='logo_container'>
        <h1><a href='./' className='logo_link'>iOne</a></h1>
      </div>
      <div className="search-container">
          <FaSearch />
          <input type="text" placeholder="Search for a country..." />
      </div>
      <div className='icon_container'>
        <ul>
          <li><a class="link" href="./"><FaUserAlt /> </a></li>
          <li><a class=" link" href="./"><FaShoppingCart /> </a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar