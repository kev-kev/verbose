import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import DefinitionSelector from "./DefinitionSelector";
import { Button, Form } from "react-bootstrap";

const EntryForm = ({ currentWord, setCurrentWord, dictionaryDefinitions }) => {
  const { createEntry, clearDefinitions } = useContext(GlobalContext);

  const [userDefinition, setUserDefinition] = useState(null);
  const [dictDefinition, setDictDefinition] = useState(null);
  const [type, setType] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    createEntry(currentWord, userDefinition, dictDefinition, type);
  };

  const handleBack = (e) => {
    e.preventDefault();
    clearDefinitions();
    setCurrentWord(null);
  };

  return (
    <Form id="entryForm" className="w-75 mb-4 mt-2">
      <Form.Label as="h5" className="mb-1">
        {currentWord}
      </Form.Label>
      <Form.Text>
        {dictionaryDefinitions[0] && (
          <DefinitionSelector
            setDictDefinition={setDictDefinition}
            dictionaryDefinitions={dictionaryDefinitions}
            setType={setType}
          />
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
