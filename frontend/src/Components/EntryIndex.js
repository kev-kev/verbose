import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Accordion, Card } from "react-bootstrap";

const EntryIndex = () => {
  const { entries } = useContext(GlobalContext);

  const renderEntryCards = (entries) => {
    if (entries) {
      let i = 0;
      return (entries.map((entry) => {
        i++;
        return (
          <Card key={i}>
            <Accordion.Toggle as={Card.Header} eventKey={i}>
              {entry.word} - {entry.newDefinition}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={i}>
              <Card.Body>{entry.dictDefinition}</Card.Body>
            </Accordion.Collapse>
          </Card>
        );
      }));
    }
  };

  return (
    <Accordion className="mx-3" style={{ width: 500 }}>
      {renderEntryCards(entries)}
    </Accordion>
  );
};

export default EntryIndex;
