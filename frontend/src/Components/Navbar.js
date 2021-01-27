import React from 'react'
import logo from '../Assets/logo.png'

export default function Navbar() {
  return (
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
        <img src={logo} alt="" width="30" height="30" class="d-inline-block align-bottom" />
          Verbose
        </a>
      </div>
    </nav>
  )
}
