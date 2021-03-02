import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Accordion, Card, Button, Modal } from "react-bootstrap";

const EntryIndex = () => {
  const { entries } = useContext(GlobalContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                {entry.dictDefinition}
                <Button onClick={handleShow} variant="primary" className="">
                  Edit
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
      <Modal show={show} onHide={handleClose}>
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
      <Accordion className="mx-3" style={{ width: 500 }}>
        {renderEntryCards(entries)}
      </Accordion>
    </>
  );
};

export default EntryIndex;
