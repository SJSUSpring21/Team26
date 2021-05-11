import React, { Component } from "react";
import "../Predictions/predictions.css";
import axios from 'axios';
import backendServer from "../../webConfig";
import "../Recommendation/recommendation.css"
import Navbar from "../Navbar/Navbar"


export default function App() {
  const [title, setTitle] = React.useState("");
 
  

  const handleSubmit = (event) => {
    console.log(`
      Title: ${title}
    `);
    
    event.preventDefault();
  }

  return (
    <div>
      <Navbar></Navbar>
    <form onSubmit={handleSubmit}
    className="recommendation-form">
      <h2><b>Similar Movie Prediction</b></h2>
      <label>
        Movie Name:
        <input
          name="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required />
      </label>

      

      <button className="recommendation-button">Submit</button>
    </form>
    </div>
  );
}
