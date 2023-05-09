import React from "react";
import "./Admin.css";
import AdminProfileSide from "../../components/AdminProfileSide/AdminProfileSide";
import AdminAnalysisSide from "../../components/AdminAnalysisSide/AdminAnalysisSide";

const Admin = () => {
  return (
    <div className="Admin">
        <AdminProfileSide/>
        <AdminAnalysisSide/>
    </div>
  );
};

export default Admin;