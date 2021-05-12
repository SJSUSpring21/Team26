import React, { Component } from "react";
import "../Predictions/predictions.css"
import Navbar from "../Navbar/Navbar"
import axios from 'axios';
import backendServer from "../../webConfig";
import CircularProgressWithLabel from '../Spinner/Spinner'
import Box from '../Box/Box'
import { useEffect, useState } from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


export default function App() {
  const [movie, setMovieName] = React.useState("");
  const [actor1, setActor1] = React.useState("");
  const [actor2, setActor2] = React.useState("");
  const [director, setDirector] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const [genre, setGenre] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [rating, setRating] = React.useState(false);
  const [actor1list, setActor1List] = React.useState([]);
  const [actor2list, setActor2List] = React.useState([]);
  const [directorlist, setDirectorList] = React.useState([]);
  const [genrelist, setGenreList] = React.useState([]);


  useEffect(() => {
    axios.get(`${backendServer}/getallactors1`).then((response)=>
    {
    console.log("Got list of all actors1",response.data)
    let actor_list=response.data
    setActor1List(actor_list)
   
    
    }
    );

    axios.get(`${backendServer}/getallactors2`).then((response)=>
    {
    console.log("Got list of all actors2",response.data)
    let actor_list=response.data
    setActor2List(actor_list)
   
    
    }
    );

    axios.get(`${backendServer}/getdirectors`).then((response)=>
    {
    console.log("Got list of all Directors",response.data)
    let actor_list=response.data
    setDirectorList(actor_list)
   
    
    }
    );

    axios.get(`${backendServer}/getgenre`).then((response)=>
    {
    console.log("Got list of all Genres",response.data)
    let actor_list=response.data
    setGenreList(actor_list)
   
    
    }
    );


    
  },[]);

  const handleChangeActor1 = (value) => {
    console.log("Got Actor1",value);
    setActor1(value)
  };

  const handleChangeActor2 = (value) => {
    console.log("Got title",value);
    setActor2(value)
  };

  const handleChangeDirector = (value) => {
    console.log("Got title",value);
    setDirector(value)
  };

  const handleGenre = (value) => {
    console.log("Got genre",value);
    setGenre(value)
  };


  const handleSubmit = (event) => {
    setLoader(true)
    console.log(`
      Movie: ${movie}
      Actor1: ${actor1}
      Actor2: ${actor2}
      Director: ${director}
      Budget: ${budget}
      Genre:${genre}
    `);

    var data ={
      movie:movie,
      director:director,
      actor1:actor1,
      actor2:actor2,
      genre:genre
    }
    
    event.preventDefault();

    axios.post(`${backendServer}/imdbpredict`,data).then((response)=>
    {
      setLoader(false)
        console.log("Got response data",response.data)
        setRating(response.data)
        
        
    })
  }

  return (
    <div>
      <Navbar></Navbar>
    <div classname="predict-body">
    <form 
    onSubmit={handleSubmit}
    className="predict-form">
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
      
      <Autocomplete
      id="combo-box-demo"
      options={actor1list}
      getOptionLabel={(option) => option}
      style={{ width: 400 }}
      renderInput={(params) => <TextField {...params} label="Actor 1 Name" variant="outlined" />}
      onChange={(event, newValue) => {
        handleChangeActor1(newValue);
      }}
    />
    <br></br>

<Autocomplete
      id="combo-box-demo"
      options={actor2list}
      getOptionLabel={(option) => option}
      style={{ width: 400 }}
      renderInput={(params) => <TextField {...params} label="Actor 2 Name" variant="outlined" />}
      onChange={(event, newValue) => {
        handleChangeActor2(newValue);
      }}
    />
    <br></br>

<Autocomplete
      id="combo-box-demo"
      options={directorlist}
      getOptionLabel={(option) => option}
      style={{ width: 400 }}
      renderInput={(params) => <TextField {...params} label="Director Name" variant="outlined" />}
      onChange={(event, newValue) => {
        handleChangeDirector(newValue);
      }}
    />
<br></br>

<Autocomplete
      id="combo-box-demo"
      options={genrelist}
      getOptionLabel={(option) => option}
      style={{ width: 400 }}
      renderInput={(params) => <TextField {...params} label="Genre" variant="outlined" />}
      onChange={(event, newValue) => {
        handleGenre(newValue);
      }}
    />

    

      <label>
        Budget:
        <input
          name="budget"
          type="text"
          value={budget}
          onChange={e => setBudget(e.target.value)}
          required />
      </label>

      

      <button className="predictbutton">Submit</button>
      <br></br>
      <br></br>
      {!loader?(
        
        <div className="boxDiv"><p className="thisP">{rating}</p></div>
      ):(<div><CircularProgressWithLabel></CircularProgressWithLabel></div>)
      
      }
    </form>
    </div>
    </div>
  );
}
