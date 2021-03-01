import NewWordForm from "./NewWordForm";
import EntryForm from "./EntryForm";
import EntryIndex from "./EntryIndex";
import Logo from "../Assets/logo.png";
import { GlobalContext } from "../Context/GlobalContext";
import React, { useContext, useState, useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";

const Home = () => {
  const {
    isSubmittingEntry,
    dictionaryDefinitions,
    isFetchingDefinitions,
    errors,
    clearErrors,
    getEntries,
  } = useContext(GlobalContext);

  const [show, setShow] = useState(false);
  useEffect(() => {
    if (errors.submit || errors.fetchDefinitions || errors.entryIndex) {
      setShow(true);
    }
  }, [errors]);

  useEffect(getEntries, []);

  const renderSpinner = () => {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  };

  const renderForm = () => {
    if (dictionaryDefinitions && dictionaryDefinitions.length > 0) {
      return <EntryForm />;
    } else {
      return <NewWordForm />;
    }
  };

  const handleClose = () => {
    setShow(false);
    clearErrors();
  };

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <img src={Logo} width="75px" height="auto" />
      <h3 className="mb-3">verbose</h3>
      {isFetchingDefinitions || isSubmittingEntry
        ? renderSpinner()
        : renderForm()}
      <EntryIndex />
      <Alert
        className="mt-3"
        variant="danger"
        show={show}
        onClose={handleClose}
        dismissible
      >
        <p>Something went wrong! Please try again in a few minutes.</p>
      </Alert>
    </div>
  );
};

export default Home;
