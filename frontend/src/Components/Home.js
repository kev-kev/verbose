import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import NewWordForm from "./NewWordForm";
import EntryForm from "./EntryForm";
import EntryIndex from "./EntryIndex";
import Logo from "../Assets/logo.png";
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

  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (
      errors.submit ||
      errors.fetchDefinitions ||
      errors.entryIndex ||
      errors.addWord ||
      errors.editWord
    ) {
      setShowAlert(true);
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
    setShowAlert(false);
    clearErrors();
  };

  const renderLoadingOrIndex = () => {
    return isFetchingDefinitions || isSubmittingEntry || isFetchingEntries ? (
      renderSpinner()
    ) : (
      <EntryIndex entries={entries} />
    );
  };

  const renderAlert = (variant, message) => {
    if (showAlert){
      return (
        <Alert
          className="mt-5 position-absolute"
          variant={variant}
          showAlert={showAlert}
          onClose={handleClose}
          dismissible
        >
          <p>{message}</p>
        </Alert>
      )
    }
  }

  return (
    <div className="mb-5 d-flex flex-column min-vh-100 align-items-center">
      {renderAlert("danger", "Something went wrong!")}
      {/* <Alert
        className="mt-5 position-absolute"
        variant="danger"
        showAlert={showAlert}
        onClose={handleClose}
        dismissible
      >
        <p>Something went wrong!</p>
      </Alert> */}
      <img
        style={{ marginTop: "20vh" }}
        src={Logo}
        width="75px"
        height="auto"
        alt="logo "
      />
      <h3 className="mb-3">verbose</h3>
      {renderForm()}
      {renderLoadingOrIndex()}
    </div>
  );
};

export default Home;
