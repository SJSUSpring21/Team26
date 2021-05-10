import React, { Component } from "react";
import "../Predictions/predictions.css";
import axios from 'axios';
import backendServer from "../../webConfig";
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

export default function RangeSlider() {
  const [startIndex, setStart] = React.useState("");
  const [endIndex, setEnd] = React.useState("");
  const [genre, setGenre] = React.useState("");
 
  const [value, setValue] = useState([0, 10]);


  

  const handleSubmit = (event) => {
    console.log(`
      Start Index: ${startIndex}
      End Index: ${endIndex}
      Genre: ${genre}
    `);
    
    event.preventDefault();
  }

  function valuetext(value) {
    return `${value}`;
  }
  const handleChange = (event, newValue) => {
    console.log(newValue)
    setStart(newValue[0])
    setEnd(newValue[1])
    setValue(newValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2><b>Recommend By Genre!</b></h2>
      <label>
        Genre:
        <input
          name="genre"
          type="text"
          value={genre}
          onChange={e => setGenre(e.target.value)}
          required />
      </label>
      <Typography id="range-slider" gutterBottom>
  Selelct IMDB Range
</Typography>
<Slider
  value={value}
  onChange={handleChange}
  valueLabelDisplay="auto"
  step={0.1}
  min={0}
  max={10}
  aria-labelledby="range-slider"
  getAriaValueText={valuetext}
/>


      

      <button>Submit</button>
    </form>
  );
}
