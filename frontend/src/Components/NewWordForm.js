import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Button, Form } from "react-bootstrap";

const NewWordForm = () => {
  const { getDictionaryDefinitions, entries, addWordFailure } = useContext(
    GlobalContext
  );

  const [word, setWord] = useState("");

  const handleSubmit = (e) => {
    let i = false;
    e.preventDefault();
    entries.map((entry) => {
      if (entry.word === word) {
        i = true;
      }
    });
    if (i === true) {
      return (addWordFailure(word))
    } else {
      return (getDictionaryDefinitions(word))
    }
  };

  return (
    <Form id="newWordForm" inline className="mb-4">
      <Form.Control
        type="text"
        placeholder="Enter a word"
        className="mr-2"
        onChange={(e) => setWord(e.target.value)}
      />
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};

export default NewWordForm;
