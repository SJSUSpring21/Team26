import logo from './logo.svg';
import './App.css';
import Predictions from "./components/Predictions/Predictions"

import Recommendation from "./components/Recommendation/Recommendation"
import Landing from "./components/Landing/Landing"
import Filter from "./components/Filter/Filter"
import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
    <Switch>
    {/* <Route path="/" exact component={Navbar} /> */}
    <Route path="/" exact component={Landing} />
    <Route path="/prediction" exact component={Predictions} />
    <Route path="/recommendation" exact component={Recommendation} />
    <Route path="/filter" exact component={Filter} />
   
    </Switch>
    </div>
    </Router>
  );
}

export default App;
