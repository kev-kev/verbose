import React, { useState } from "react";
import EntryModal from "./EntryModal";
import { Accordion, Card, Button } from "react-bootstrap";

const EntryIndex = ({ entries, }) => {
  const [selectedEntry, setSelectedEntry] = useState();
  const [modalForm, setModalForm] = useState();

  const handleButtonClick = (entry, form) => {
    setSelectedEntry(entry);
    setModalForm(form);
  };

  const getTypeAbbv = (type) => {
    const abbvArr = [
      "adverb",
      "adjective",
      "pronoun",
      "preposition",
      "conjunction",
      "interjection",
    ];
    if (abbvArr.includes(type)) {
      return `(${type.slice(0, 3)})`;
    } else {
      return `(${type})`;
    }
  };

  const renderEntryCards = (entries) => {
    if (entries) {
      let i = 0;
      return entries.map((entry) => {
        i++;
        return (
          <Card key={i}>
            <Accordion.Toggle as={Card.Header} eventKey={i}>
              {entry.word} - {entry.newDefinition}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={i}>
              <Card.Body>
                <Card.Text className="mt-n3">
                  <span className="font-italic" style={{ fontSize: "small" }}>
                    {entry.type && getTypeAbbv(entry.type)}
                  </span>{" "}
                  <br />
                  {entry.dictDefinition}
                </Card.Text>
                <Button
                  onClick={() => handleButtonClick(entry, "edit")}
                  variant="primary"
                  className="mr-2"
                  size="sm"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleButtonClick(entry, "delete")}
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
      {modalForm && (
        <EntryModal
          entry={selectedEntry}
          form={modalForm}
          setForm={setModalForm}
        />
      )}
      <Accordion className="mx-3" style={{ width: 500 }}>
        {renderEntryCards(entries)}
      </Accordion>
    </>
  );
};

export default EntryIndex;
