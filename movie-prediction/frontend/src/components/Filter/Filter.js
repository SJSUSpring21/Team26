import React, { Component } from "react";
import "../Predictions/predictions.css";
import axios from 'axios';
import backendServer from "../../webConfig";
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider';
import { useState } from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Navbar from "../Navbar/Navbar"
import "../Filter/filter.css"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



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
  const [data_to_display, setDisplay] = useState([]);


  

  const handleSubmit = (event) => {
    console.log(`
      Start Index: ${startIndex}
      End Index: ${endIndex}
      Genre: ${genre}
      `);
      var data = { // nametosettle:this.state.nametosettleup,
        startIndex:startIndex.toString(),
        endIndex: endIndex.toString(),
        genre: genre.toString()

    }
    console.log("Printing data on frontend",data)
      axios.post(`${backendServer}/genre`,data).then((response)=>
      {
        // console.log("movies data:", response.data)
        let response_array=response.data
        console.log("Getting response array",response_array)
        if(response_array.length<10)
        {
          setDisplay(response_array)
        }
        else
        {
          const shuffled = response_array.sort(() => 0.5 - Math.random());
          let selected = shuffled.slice(0, 10);
          console.log("SHuffled and randomly picked array:",selected)
          setDisplay(selected)
        }
        
       

      })
      

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

  const handleChangeGenre = (event) => {
    console.log(event.target.value);
    setGenre(event.target.value)
  };



  return (
    <div>
      <Navbar></Navbar>
      
    <form onSubmit={handleSubmit} className="filter-form">
      <h1><b>Recommend By Genre!</b></h1>
      <label>
        Genre:
        <select value="1"
              value={genre}
                            
                            onChange={handleChangeGenre}
                            className="genreClass"
                        >
        {/* <select value="Genre" onChange={e => setGenre(e.target.value)} className="genreClass"> */}
        <option value="Comedy"> Comedy</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Animation">Animation</option>
        <option value="Crime">Crime</option>
        <option value="Horror">Horror</option>
        <option value="Mystery">Mystery</option>
        <option value="Romance">Romance</option>
        <option value="Documentary">Documentary</option>
        <option value="Drama">Drama</option>
        <option value="Thriller">Thriller</option>
          value={genre}
          
          required 
          </select>
      </label>
      <br></br>
      <Typography id="range-slider" gutterBottom>
  <b>Select IMDB Range</b>
</Typography>
<Slider
  value={value}
  onChange={handleChange}
  valueLabelDisplay="on"
  step={0.1}
  min={0}
  max={10}
  aria-labelledby="range-slider"
  getAriaValueText={valuetext}
/>
<br></br>

      

      <button className="filter-button" onSubmit={handleSubmit}>Submit</button>
      <br></br>
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
      {/* <TableHead>
      <TableRow>
      <TableCell>Movie</TableCell>
      <TableCell align="right">Rating</TableCell>

      </TableRow>
      </TableHead> */}
      <TableBody>
      {data_to_display.map((row) => (
      <TableRow key={row}>
        <TableCell component="th" scope="row">{row[0]}</TableCell>
        <TableCell align="right">{row[1]}</TableCell>
        </TableRow>
      ))}
      </TableBody>
      </Table>
      </TableContainer>
    </form>
    </div>
  );
}
