import React, { useContext, useState, useEffect, useRef } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Button, Form, Modal } from 'react-bootstrap';

const NewWordForm = () => {
  const {
    entries,
    isSubmittingEntry,
    createEntry,
    errors,
    clearErrors,
  } = useContext(GlobalContext);

  const [word, setWord] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    // make dictionary api call and add to state
    e.preventDefault()
    
    if (!word) {
      // handle error
      console.log("No word entered!")
    } else {
      setShow(true)
      console.log(word)
    };
  }

  function EntryModal() {
    return(
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{word}</Modal.Title>
        </Modal.Header>
        <Modal.Body>dictionary definition here</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <>
      <Form id="newWordForm" inline>
        <Form.Control type="text" placeholder="Enter a word" className="mr-2" onChange={(e) => setWord(e.target.value)}/>
        <Button variant="primary" type="submit" onClick={handleShow}>
          Submit
        </Button>
      </Form>
      <EntryModal />
    </>
  );
};

export default NewWordForm;
