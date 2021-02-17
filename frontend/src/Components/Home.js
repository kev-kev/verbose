import React, { Component } from "react";
import NewWordForm from "./NewWordForm";
import Logo from "../Assets/logo.png"


export class Home extends Component {
  render() {
    return (
      <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <img src={Logo} width="100px" height="auto"/>
        <h3>verbose</h3> <br />
        <NewWordForm />
      </div>
    );  
  }
}

export default Home;
