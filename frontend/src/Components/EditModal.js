import React, { useContext, useState, } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Modal, Button, Form } from "react-bootstrap";

const EditModal = ({entry, editModalIsOpen, setEditModalIsOpen }) => {
  const { editEntry } = useContext(
    GlobalContext
  );
  const [entryUserDefinition, setEntryUserDefinition] = useState();

  const handleClose = () => {
    setEditModalIsOpen(false);
  };

  const handleSave = () => {
    editEntry(entry, entryUserDefinition);
    setEditModalIsOpen(false);
  };

  return (
    <Modal show={editModalIsOpen} onHide={handleClose} className="mt-5">
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>{entry.word}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Dictionary Definition: <br />
          {entry.dictDefinition} <hr />
          Your Definition: <br />
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue={entry.newDefinition}
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
