import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Button, Form } from "react-bootstrap";

const NewWordForm = ({ currentWord, setCurrentWord, entries }) => {
  const { getDictionaryDefinitions, addWordFailure } = useContext(
    GlobalContext
  );

  const handleSubmit = (e) => {
    let i = false;
    e.preventDefault();
    entries.map((entry) => {
      if (entry.word === currentWord) {
        i = true;
      }
    });
    if (i === true) {
      return addWordFailure(currentWord);
    } else {
      return getDictionaryDefinitions(currentWord);
    }
  };

  return (
    <Form id="newWordForm" inline className="mb-4">
      <Form.Control
        type="text"
        placeholder="Enter a word"
        className="mr-2"
        onChange={(e) => setCurrentWord(e.target.value)}
      />
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};

export default NewWordForm;
