import React, { Component } from "react";
import NewWordForm from "./NewWordForm";

export class Home extends Component {
  render() {
    return (
      <div class="container d-flex justify-content-center align-items-center vh-100">
        <NewWordForm />
      </div>
    );
  }
}

export default Home;
