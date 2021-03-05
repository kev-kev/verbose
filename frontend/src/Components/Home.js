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
    isFetchingEntries,
    errors,
    clearErrors,
    getEntries,
    entries,
  } = useContext(GlobalContext);

  const [show, setShow] = useState(false);
  useEffect(() => {
    if (
      errors.submit ||
      errors.fetchDefinitions ||
      errors.entryIndex ||
      errors.addWord ||
      errors.editWord
    ) {
      setShow(true);
    }
  }, [errors]);

  useEffect(getEntries, []);

  const [currentWord, setCurrentWord] = useState(null);

  const renderSpinner = () => {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  };

  const renderForm = () => {
    if (dictionaryDefinitions && dictionaryDefinitions.length > 0) {
      return (
        <EntryForm
          currentWord={currentWord}
          setCurrentWord={setCurrentWord}
          dictionaryDefinitions={dictionaryDefinitions}
        />
      );
    } else {
      return (
        <NewWordForm
          currentWord={currentWord}
          setCurrentWord={setCurrentWord}
          entries={entries}
        />
      );
    }
  };

  const handleClose = () => {
    setShow(false);
    clearErrors();
  };

  const renderLoadingOrIndex = () => {
    return isFetchingDefinitions || isSubmittingEntry || isFetchingEntries ? (
      renderSpinner()
    ) : (
      <EntryIndex entries={entries} />
    );
  };

  return (
    <div className="mb-5 d-flex flex-column min-vh-100 align-items-center">
      <Alert
        className="mt-3"
        variant="danger"
        show={show}
        onClose={handleClose}
        dismissible
      >
        <p>Something went wrong!</p>
      </Alert>
      <img
        style={{ marginTop: "20vh" }}
        src={Logo}
        width="75px"
        height="auto"
      />
      <h3 className="mb-3">verbose</h3>
      {renderForm()}
      {renderLoadingOrIndex()}
    </div>
  );
};

export default Home;
