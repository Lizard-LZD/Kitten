import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Home.css";
import { connect } from "react-redux";

const Home = () => {
  return (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Home;
