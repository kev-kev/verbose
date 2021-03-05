import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Button, Form } from "react-bootstrap";
import DefinitionSelector from "./DefinitionSelector";

const EntryForm = (props) => {
  const {
    createEntry,
    dictionaryDefinitions,
    clearDefinitions
  } = useContext(GlobalContext);

  const [userDefinition, setUserDefinition] = useState(null);
  const [dictDefinition, setDictDefinition] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    createEntry(props.currentWord, userDefinition, dictDefinition);
  };

  const handleBack = (e) => {
    e.preventDefault();
    clearDefinitions();
    props.setCurrentWord(null);
  };

  return (
    <Form id="entryForm" className="mw-50 mb-5">
      <Form.Label>{props.currentWord}</Form.Label>
      <Form.Text>
        {dictionaryDefinitions[0] && (
          <DefinitionSelector setDictDefinition={setDictDefinition} />
        )}
      </Form.Text>
      <Form.Control
        className="m-2"
        as="textarea"
        rows="2"
        placeholder="write the above in your own words"
        onChange={(e) => setUserDefinition(e.target.value)}
      />
      <Button variant="secondary" onClick={handleBack} className="mr-2">
        Back
      </Button>
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};

export default EntryForm;
