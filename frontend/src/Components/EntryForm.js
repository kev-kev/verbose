import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Button, Form } from "react-bootstrap";

const EntryForm = () => {
  const {
    createEntry,
    dictionaryDefinitions,
    currentWord,
    clearCurrentWord,
  } = useContext(GlobalContext);

  const [userDefinition, setUserDefinition] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createEntry(
      currentWord,
      userDefinition,
      dictionaryDefinitions[0].definition
    );
  };

  const handleBack = (e) => {
    e.preventDefault();
    clearCurrentWord();
  };

  return (
    <Form id="entryForm" className="w-75">
      <Form.Label>{currentWord}</Form.Label>
      <Form.Text>
        {dictionaryDefinitions && dictionaryDefinitions.length > 0
          ? dictionaryDefinitions[0].definition
          : null}
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