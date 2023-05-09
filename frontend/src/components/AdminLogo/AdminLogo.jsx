import React from "react";
import Logo from "../../img/logo.png";
import './AdminLogo.css'
import { UilSearch } from '@iconscout/react-unicons'
const AdminLogo = () => {
  return (
    <div className="AdminLogo">
      <img src={Logo} alt="" />
      <div className="Search">
          <input type="text" placeholder="Explore"/>
          <div className="s-icon">
                <UilSearch/>
          </div>
      </div>
    </div>
  );
};

export default AdminLogo;