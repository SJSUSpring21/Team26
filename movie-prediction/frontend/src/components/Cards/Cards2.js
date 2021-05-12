import { useRef } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import movierec from "./Movie-Recommendation.jpg"

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
      <h2>Similar Movie Recommendation</h2> <br /> 
      {/* <button onClick={() => { ref.current.toggle(); }}> Toggle via button</button> */}
      <img src={movierec} 
      width="350px"
      height= '200px'
      margin="auto"
      >
      
      </img>
     
      <h3><p>Fascinated by the story of a movie?</p> </h3>
      <h3><p>Use this feature to get movies with similar storylines!</p> </h3>
     </FrontSide>
    
    
    <BackSide style={{ backgroundColor: '#fffffc'}}>
        <h3>Movie Recommendation</h3>

        <li style={{fontSize: "20px"}}>Sometimes you are so fascinated by the story-line of a movie, you feel like watching it again and again.</li> <br></br>
      <li style={{fontSize: "20px"}}>This feature recommends top 10 movies with a similar storyline.</li> <br></br>

      
    </BackSide>
  </Flippy>


  )
}