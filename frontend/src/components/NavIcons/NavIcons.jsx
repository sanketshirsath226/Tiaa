import React from "react";
import "./NavIcons.css";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/AuthActions";

const NavIcons = () => {
  const dispatch = useDispatch()
  const handleLogOut = ()=> {
    dispatch(logout())
  }

  return (
    <div className="navIcons">
      <Link to="../home">
        <img src={Home} alt="" />
      </Link>
      <div className="vl" style={{height:"1.5rem"}}>

      </div>
      <img src={Noti} alt="" />
      <div className="vl" style={{height:"1.5rem"}}>

</div>
      <Link to="../chat">
        <img src={Comment} alt="" />
      </Link>
      <div className="vl" style={{height:"1.5rem"}}>

</div>
      <div>
      <button
            className="button ps-button"
            onClick={handleLogOut}
            // disabled={loading}
          >
            {"Log out"}
          </button>
      </div>
    </div>
  );
};

export default NavIcons;