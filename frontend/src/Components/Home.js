import NewWordForm from "./NewWordForm";
import EntryForm from "./EntryForm";
import Logo from "../Assets/logo.png"
import { GlobalContext } from "../Context/GlobalContext";
import React, { useContext, useState, useEffect, useRef } from "react";
import { Spinner, Alert } from "react-bootstrap";

const Home = () => {
  const {
    isSubmittingEntry,
    dictionaryDefinitions,
    isFetchingDefinition,
    errors,
    clearErrors
  } = useContext(GlobalContext);

  useEffect(() => {
    if (errors) {
      return(
        <Alert show={show} variant="danger">
          <p>Something went wrong! Please try again in a few minutes.</p>
        </Alert>
      )
    }
  }, [errors])

  const[show, setShow] = useState(false);

  const renderSpinner = () => {
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  }

  const renderForm = () => {
    if (dictionaryDefinitions && dictionaryDefinitions.length > 0) {
      return <EntryForm />
    } else {
      return <NewWordForm />
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <img src={Logo} width="100px" height="auto"/>
      <h3>verbose</h3> <br />
      {isFetchingDefinition || isSubmittingEntry ? renderSpinner() : renderForm()}
    </div>
  )
}

export default Home

