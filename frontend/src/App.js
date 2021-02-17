import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Components/Home";
import WordDisplay from "./Components/WordDisplay";
import EditWordForm from "./Components/EditWordForm";
import NewWordForm from "./Components/NewWordForm";
import Navbar from "./Components/Navbar";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/:id" component={WordDisplay} />
        <Route path="/edit/:id" component={EditWordForm} />
        <Route path="new" component={NewWordForm} />
      </Router>
    );
  }
}

export default App;
