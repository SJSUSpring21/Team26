import React, { Component } from "react";
import "../Predictions/predictions.css";
import axios from 'axios';
import backendServer from "../../webConfig";


export default function App() {
  const [title, setTitle] = React.useState("");
 
  

  const handleSubmit = (event) => {
    console.log(`
      Title: ${title}
    `);
    
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2><b>Movie Recommender</b></h2>
      <label>
        Movie Name:
        <input
          name="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required />
      </label>

      

      <button>Submit</button>
    </form>
  );
}
