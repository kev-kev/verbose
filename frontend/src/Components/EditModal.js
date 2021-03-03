import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Modal, Button, Form } from "react-bootstrap";

const EditModal = (props) => {
  const { editModalIsOpen, setEditModal } = useContext(GlobalContext);
  const handleClose = () => {
    setEditModal(false);
  };

  return (
    <Modal show={editModalIsOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.entry.word}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Dictionary Definition: <br />
        {props.entry.dictDefinition} <hr />
        Your Definition: <br />
        {props.entry.newDefinition}
        </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
