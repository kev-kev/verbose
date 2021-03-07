import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Modal, Button, Form } from "react-bootstrap";

const EntryModal = ({ entry, form, setForm }) => {
  const { editEntry, deleteEntry } = useContext(GlobalContext);
  const [entryUserDefinition, setEntryUserDefinition] = useState();

  const handleClose = () => {
    setForm(null);
  };

  const handleSave = () => {
    editEntry(entry, entryUserDefinition);
    setForm(null);
  };

  const handleDelete = () => {
    deleteEntry(entry);
    setForm(null);
  };

  if (form === "delete") {
    return (
      <Modal show={form} onHide={handleClose} className="mt-5">
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Delete Entry</Modal.Title>
          </Modal.Header>
          <Modal.Body>Delete entry for {entry.word}?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Back
            </Button>
            <Button variant="danger" onClick={() => handleDelete(entry)}>
              Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  } else if (form === "edit") {
    return (
      <Modal show={form} onHide={handleClose} className="mt-5">
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
  }
};

export default EntryModal;
