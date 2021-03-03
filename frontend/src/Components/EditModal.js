import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Modal, Button } from "react-bootstrap";

const EditModal = (props) => {

  const { editModalIsOpen, setEditModal } = useContext(GlobalContext);
  const handleClose = () => {
    setEditModal(false)
  };

  return (
    <Modal show={editModalIsOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
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
