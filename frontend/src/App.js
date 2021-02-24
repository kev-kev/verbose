import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalProvider } from "./Context/GlobalContext";

import Home from "./Components/Home";
import WordDisplay from "./Components/WordDisplay";
import EditWordForm from "./Components/EditWordForm";
import NewWordForm from "./Components/NewWordForm";

class App extends Component {
  render() {
    return (
      <GlobalProvider>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/:id" component={WordDisplay} />
          <Route path="/edit/:id" component={EditWordForm} />
          <Route path="/new" component={NewWordForm} />
        </Router>
      </GlobalProvider>
    );
  }
}

export default App;
