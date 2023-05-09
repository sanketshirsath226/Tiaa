import React from "react";
import "./AdminAnalysisSide.css";
import Analysis from "../Analysis/Analysis";
import PostBlock from "../PostBlock/PostBlock";

const AdminAnalysisSide = () => {
  return (
    <div className="AdminAnalysisSide">
        <Analysis/>
        <PostBlock/>
    </div>
  );
};

export default AdminAnalysisSide;