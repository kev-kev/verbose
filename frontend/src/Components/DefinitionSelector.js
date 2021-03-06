import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";

const DefinitionSelector = ({ setDictDefinition, dictionaryDefinitions }) => {
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
      <p className="mt-n2 font-weight-light font-italic" >({dictionaryDefinitions[activeNumber].type})</p>
      <h6 className="font-weight-normal mt-n3">{dictionaryDefinitions[activeNumber].definition}</h6>
      {dictionaryDefinitions.length > 1 && <Pagination>{items}</Pagination>}
    </>
  );
};

export default DefinitionSelector;
