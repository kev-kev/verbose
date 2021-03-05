import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Pagination } from "react-bootstrap";

const DefinitionSelector = ({ setDictDefinition }) => {
  const { dictionaryDefinitions } = useContext(GlobalContext);
  const [activeNumber, setActiveNumber] = useState(0);

  const handleOnClick = (i) => {
    setActiveNumber(i);
    setDictDefinition(dictionaryDefinitions[i].definition);
  };

  useEffect(() => {
    function setFirstDefinition() {
      setDictDefinition(dictionaryDefinitions[0].definition);
    }
    setFirstDefinition();
  }, [dictionaryDefinitions, setDictDefinition]);

  let items = [];
  for (let number = 0; number < dictionaryDefinitions.length; number++) {
    items.push(
      <Pagination.Item
        key={number + 1}
        active={number === activeNumber}
        onClick={() => {
          handleOnClick(number);
        }}
      >
        {number + 1}
      </Pagination.Item>
    );
  }

  return (
    <>
      <p>{dictionaryDefinitions[activeNumber].definition}</p>
      {dictionaryDefinitions.length > 1 && (
        <Pagination>{items}</Pagination>
      )}
    </>
  );
};

export default DefinitionSelector;
