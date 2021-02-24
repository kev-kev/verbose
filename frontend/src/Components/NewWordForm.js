import React, { useContext, useState, useEffect, useRef } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Button, Form } from "react-bootstrap";

const NewWordForm = () => {
  const {
    dictionaryDefinitions,
    getDictionaryDefinitions,
    currentWord,
  } = useContext(GlobalContext);

  const [word, setWord] = useState("");
  const [dictDefinitions, setDictDefinitions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getDictionaryDefinitions(word)
  };

  useEffect(() => {
    setDictDefinitions(dictionaryDefinitions);
  }, [dictionaryDefinitions]);

  useEffect(() => {
    if(currentWord){
      console.log(currentWord)
    }
  }, [currentWord])

  return (
    <Form id="newWordForm" inline>
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
