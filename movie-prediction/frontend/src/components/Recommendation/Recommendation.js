import React, { Component } from "react";
import "../Predictions/predictions.css";
import { useEffect, useState } from "react";
import axios from 'axios';
import backendServer from "../../webConfig";
import "../Recommendation/recommendation.css"
import Navbar from "../Navbar/Navbar"
import Select, {components} from 'react-select';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgressWithLabel from '../Spinner/Spinner'


export default function App() {
  const [title, setTitle] = React.useState("");
  const [all_list, setList] = React.useState([]);
  const [recommendlist, setRecommend] = React.useState([]);
  const [loader, setLoader] = React.useState(false);




  const handleChangeTitle = (value) => {
    console.log("Got title",value);
    setTitle(value)
  };

 const submitTitle = (value) => {
    setLoader(true)
    console.log("Got value title",value)
    let title=value
    var data = {
      title:value

  }
   axios.post(`${backendServer}/recommendation`,data).then((response)=>
    {
      setLoader(false)
        console.log("Got response data",response.data)
       
        setRecommend(response.data)
        
    })
    
  };
 

  


  useEffect(() => {
    axios.get(`${backendServer}/getallmovies`).then((response)=>
    {
    console.log("Got list of all movies",response.data)
    let movie_list=response.data
    
    setList(movie_list)
   
    
    }
    );
    
  },[]);

   
    
  

  return (
    <div>
      <Navbar></Navbar>
      <div className="recommend-form">
      <h2><b>Similar Movie Prediction</b></h2>
     
        Movie Name:

        {/* <input
          name="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required /> */}

{console.log("Getiing list",all_list)}

<Autocomplete
      id="combo-box-demo"
      options={all_list}
      getOptionLabel={(option) => option}
      style={{ width: 400 }}
      renderInput={(params) => <TextField {...params} label="Write a Movie Name" variant="outlined" />}
      onChange={(event, newValue) => {
        handleChangeTitle(newValue);
      }}
    />
    <br></br>
    
      
    <button className="recommendation-button" onClick={() => {submitTitle(title)}}>Submit</button>
    <br></br>
      {console.log(loader)}
    {!loader ? (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
      {/* <TableHead>
      <TableRow>
      <TableCell>Movie</TableCell>
      <TableCell align="right">Rating</TableCell>

      </TableRow>
      </TableHead> */}
      <TableBody>
      {recommendlist.map((row) => (
      <TableRow key={row}>
        <TableCell component="th" scope="row">{row}</TableCell>
        
        </TableRow>
      ))}
      </TableBody>
      </Table>
      </TableContainer>
    ):
    (<center><CircularProgressWithLabel></CircularProgressWithLabel></center>)
      }
    </div>
   
    </div>

  );
}
