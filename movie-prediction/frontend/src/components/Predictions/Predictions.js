import React, { Component } from "react";
import "../Predictions/predictions.css"


export default function App() {
  const [movie, setMovieName] = React.useState("");
  const [actor1, setActor1] = React.useState("");
  const [actor2, setActor2] = React.useState("");
  const [director, setDirector] = React.useState("");
  const [budget, setBudget] = React.useState("");
  

  const handleSubmit = (event) => {
    console.log(`
      Movie: ${movie}
      Actor1: ${actor1}
      Actor2: ${actor2}
      Director: ${director}
      Budget: ${budget}
    `);
    
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2><b>Predict IMDB Rating!</b></h2>

      <label>
        Movie Name:
        <input
          name="movie"
          type="text"
          value={movie}
          onChange={e => setMovieName(e.target.value)}
          required />
      </label>
      
      <label>
        Actor Name:
        <input
          name="actor1"
          type="text"
          value={actor1}
          onChange={e => setActor1(e.target.value)}
          required />
      </label>

      <label>
        Second Actor Name:
        <input
          name="actor2"
          type="text"
          value={actor2}
          onChange={e => setActor2(e.target.value)}
          required />
      </label>

      <label>
        Director Name:
        <input
          name="directorname"
          type="text"
          value={director}
          onChange={e => setDirector(e.target.value)}
          required />
      </label>

      <label>
        Budget:
        <input
          name="budget"
          type="text"
          value={budget}
          onChange={e => setBudget(e.target.value)}
          required />
      </label>

      

      <button>Submit</button>
    </form>
  );
}
