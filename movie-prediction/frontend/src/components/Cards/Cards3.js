import { useRef } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import genre from "./genre.jpeg"
import {Redirect} from 'react-router';

export default function Sample() {
  const ref = useRef();
  return (
    <Flippy
      flipOnHover={false} // default false
      flipOnClick={true} // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
      style={{ width: '400px', height: '550px',  margin:'30px 0px 0px 40px' }} /// these are optional style, it is not necessary
  >
    
    
    
    <FrontSide style={{ backgroundColor: '#fffffc'}} >
   <h2>Movie Suggestion</h2>
      {/* <button onClick={() => { ref.current.toggle(); }}> Toggle via button</button> */}
      <img src={genre}
       width="350px"
       height= '200px'
       margin="auto"
       padding="10px"
      >
      
      </img>
      <h3><p>Bored of watching the same movies again and again?</p> </h3>
      
      <h3><p>Use this feature to get some cool movie suggestions based on your favourite genre!</p> </h3>
     </FrontSide>
    
    
    <BackSide style={{ backgroundColor: '#fffffc'}}>
      <h3>Movie Suggestion</h3>
   

            
        <li style={{fontSize: "20px"}}>If you are bored of watching same old movies and don't want to waste time on searching movies, you can use this feature to watch movies with the same genre you like</li> <br></br>
      <li style={{fontSize: "20px"}}>You can also explicitely provide the range of IMDB score values to get some really good movie suggestions </li> <br></br>
      <li style={{fontSize: "20px"}}>This Feature recommends you any 10 movies on the basis of genre and the IMDB score</li>



    </BackSide>
  </Flippy>


  )
}