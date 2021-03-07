import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Modal, Button, Form } from "react-bootstrap";

const DeleteModal = ({ entry, deleteModalIsOpen, setDeleteModalIsOpen }) => {
  const { deleteEntry } = useContext(GlobalContext);

  const handleClose = () => {
    setDeleteModalIsOpen(false);
  };

  const handleDelete = (entry) => {
    deleteEntry(entry);
    setDeleteModalIsOpen(false);
  };

  return (
    <Modal show={deleteModalIsOpen} onHide={handleClose} className="mt-5">
      {console.log(entry)}
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Delete Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Delete entry for {entry.word}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
          <Button variant="danger" onClick={(() => handleDelete(entry))}>
            Delete
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default DeleteModal;
