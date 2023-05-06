import React from "react";
import "./Home.css";
import PostSide from "../../components/PostSide/PostSide";
import RightSide from "../../components/RightSide/RightSide";
import ProfileSide from "../../components/ProfileSide/ProfileSide";

const Home = () => {
  return (
    <div className="Home">
        <ProfileSide/>
        <PostSide/>
        <RightSide/>      
    </div>
  );
};

export default Home;