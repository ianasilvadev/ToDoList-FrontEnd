import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import StefaniniLogo from './Imagens/Stefanini_Group_Logo.jpg';

const Header = () => {


  return (
    <header
      className="d-flex justify-content-between align-items-center px-4 py-2 shadow-sm bg-white"
      style={{ height: "60px", fontFamily: "Montserrat, sans-serif" }}
    >
      <div>
        <img src={StefaniniLogo} alt="Stefanini Logo" style={{ height: '60px' }} />
      </div>

      <div className="d-flex align-items-center">

        <div className="d-flex align-items-center me-3" style={{ position: "relative" }}>

        </div>

      </div>
    </header>
  );
};

export default Header;
