import React, { Component } from "react";

export class NewWordForm extends Component {
  render() {
    return (
      <div class="container-fluid">
        <div class="row justify-content-center">
          <form class="form-inline">
            <label class="sr-only" for="wordInput">
              Enter a Word
            </label>
            <input
              type="text"
              class="form-control mb-2 mr-sm-2 col-6"
              id="wordInput"
              placeholder="Enter a Word"
            />
            <button type="submit" class="btn btn-primary mb-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default NewWordForm;
