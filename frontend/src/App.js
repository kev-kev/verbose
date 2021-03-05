import React, { Component } from "react";
import { GlobalProvider } from "./Context/GlobalContext";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Components/Home";

class App extends Component {
  render() {
    return (
      <GlobalProvider>
        <Home /> 
      </GlobalProvider>
    );
  }
}

export default App;
