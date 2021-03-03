import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Accordion, Card, Button, Modal } from "react-bootstrap";
import EditModal from "./EditModal";

const EntryIndex = () => {
  const { entries, deleteEntry, editModalIsOpen, setEditModal } = useContext(GlobalContext);
  const handleShowEditForm = () => setEditModal(true);

  const handleDelete = (word) => {
    deleteEntry(word);
  };

  const renderEntryCards = (entries) => {
    if (entries) {
      let i = 0;
      return entries.map((entry) => {
        i++;
        return (
          <Card key={i}>
            <Accordion.Toggle
              as={Card.Header}
              eventKey={i}
              className="d-flex justify-content-space-between"
            >
              {entry.word} - {entry.newDefinition}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={i}>
              <Card.Body>
                <Card.Text>{entry.dictDefinition}</Card.Text>
                <Button
                  onClick={handleShowEditForm}
                  variant="primary"
                  className="mr-2"
                  size="sm"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(entry.word)}
                  variant="danger"
                  size="sm"
                >
                  Delete
                </Button>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        );
      });
    }
  };

  return (
    <>
      <EditModal show={editModalIsOpen}/>
      <Accordion className="mx-3" style={{ width: 500 }}>
        {renderEntryCards(entries)}
      </Accordion>
    </>
  );
};

export default EntryIndex;
