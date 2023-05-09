import React from "react";
import "./AdminProfileCard.css";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminProfileCard = ({location}) => {
  return (
    <div className="AdminProfileCard">
      <div className="ProfileImages">
        <img src={Cover}/>
        <img src={Profile} />
      </div>
      <div className="ProfileName">
        <span>Admin</span>
      </div>
    </div>
  );
};

export default AdminProfileCard;