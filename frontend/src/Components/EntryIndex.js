import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Accordion, Card, Button, Modal } from "react-bootstrap";
import EditModal from "./EditModal";

const EntryIndex = () => {
  const { entries, deleteEntry, editModalIsOpen, setEditModal } = useContext(
    GlobalContext
  );
  const [selectedEntry, setSelectedEntry] = useState();

  const handleDelete = (word) => {
    deleteEntry(word);
  };

  const onEditClick = (entry) => {
    setSelectedEntry(entry);
    setEditModal(true);
  };

  const renderEntryCards = (entries) => {
    if (entries) {
      let i = 0;
      console.log(entries)
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
                  onClick={() => onEditClick(entry)}
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
      {editModalIsOpen ? (
        <EditModal show={editModalIsOpen} entry={selectedEntry} />
      ) : null}
      <Accordion className="mx-3" style={{ width: 500 }}>
        {renderEntryCards(entries)}
      </Accordion>
    </>
  );
};

export default EntryIndex;
