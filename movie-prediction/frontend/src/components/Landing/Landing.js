import React, { Component } from "react";
import "../Predictions/predictions.css";
import axios from 'axios';
import backendServer from "../../webConfig";
import { useEffect, useState } from "react";


export default function App() {
  const [model, setModel] = React.useState("");
 
  useEffect(() => {

    loadModel();
   
  }); 

  const loadModel=() =>
  {
      axios.get(`${backendServer}/loadmodel`).then((response)=>
      {
        
      })
  }

  return (
   <h1>Landing Page</h1>
  );
}
