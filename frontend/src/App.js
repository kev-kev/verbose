import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalProvider } from "./Context/GlobalContext";

import Home from "./Components/Home";

class App extends Component {
  render() {
    return (
      <GlobalProvider>
        {/* <Router>
          <Route path="/" exact component={Home} />
        </Router> */}
        <Home /> 
      </GlobalProvider>
    );
  }
}

export default App;
