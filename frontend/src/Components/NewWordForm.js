import React, { Component } from "react";

export class NewWordForm extends Component {
  render() {
    return (
      <div class="container">
        <form class="row align-items-center">
          <label class="sr-only" for="wordInput">
            Enter a Word
          </label>
          <input
            type="text"
            class="form-control mb-2 mr-sm-2 col"
            id="wordInput"
            placeholder="Enter a Word"
          />
          <button type="submit col" class="btn btn-primary mb-2">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default NewWordForm;
