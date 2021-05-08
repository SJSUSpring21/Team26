import logo from './logo.svg';
import './App.css';
import Predictions from "./components/Predictions/Predictions"
import Navbar from "./components/Navbar/Navbar"

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Predictions></Predictions>
    </div>
  );
}

export default App;
