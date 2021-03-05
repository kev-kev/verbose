import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Accordion, Card, Button } from "react-bootstrap";
import EditModal from "./EditModal";

const EntryIndex = ({ entries }) => {
  const { deleteEntry } = useContext(GlobalContext);
  const [selectedEntry, setSelectedEntry] = useState();
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const handleDelete = (word) => {
    deleteEntry(word);
  };

  const onEditClick = (entry) => {
    setSelectedEntry(entry);
    setEditModalIsOpen(true);
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
      {editModalIsOpen && (
        <EditModal
          editModalIsOpen={editModalIsOpen}
          setEditModalIsOpen={setEditModalIsOpen}
          entry={selectedEntry}
        />
      )}
      <Accordion className="mx-3" style={{ width: 500 }}>
        {renderEntryCards(entries)}
      </Accordion>
    </>
  );
};

export default EntryIndex;
