import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Modal, Button, Form } from "react-bootstrap";

const EditModal = (props) => {
  const { editModalIsOpen, setEditModal, editEntry } = useContext(
    GlobalContext
  );
  const [entryUserDefinition, setEntryUserDefinition] = useState();

  const handleClose = () => {
    setEditModal(false);
  };

  const handleSave = () => {
    editEntry(props.entry, entryUserDefinition);
    setEditModal(false);
  };

  return (
    <Modal show={editModalIsOpen} onHide={handleClose} className="mt-5">
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>{props.entry.word}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Dictionary Definition: <br />
          {props.entry.dictDefinition} <hr />
          Your Definition: <br />
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={props.entry.newDefinition}
            onChange={(e) => setEntryUserDefinition(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditModal;
