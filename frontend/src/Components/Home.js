import React, { Component } from 'react'
import NewWordForm from './NewWordForm'

export class Home extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center">
        <NewWordForm />
      </div>
    )
  }
}

export default Home
