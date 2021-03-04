import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Button, Form } from "react-bootstrap";

const NewWordForm = (props) => {
  const { getDictionaryDefinitions, entries, addWordFailure } = useContext(
    GlobalContext
  );

  const handleSubmit = (e) => {
    let i = false;
    e.preventDefault();
    entries.map((entry) => {
      if (entry.word === props.currentWord) {
        i = true;
      }
    });
    if (i === true) {
      return addWordFailure(props.currentWord);
    } else {
      return getDictionaryDefinitions(props.currentWord);
    }
  };

  return (
    <Form id="newWordForm" inline className="mb-5" >
      <Form.Control
        type="text"
        placeholder="Enter a word"
        className="mr-2"
        onChange={(e) => props.setCurrentWord(e.target.value)}
      />
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};

export default NewWordForm;
