import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";

const DefinitionSelector = ({ setDictDefinition, dictionaryDefinitions, setType }) => {
  const [activeNumber, setActiveNumber] = useState(0);

  const handleOnClick = (i) => {
    setActiveNumber(i);
    setDictDefinition(dictionaryDefinitions[i].definition);
    setType(dictionaryDefinitions[i].type)
  };

  useEffect(() => {
    function setFirstDefinition() {
      setDictDefinition(dictionaryDefinitions[0].definition);
      setType(dictionaryDefinitions[0].type)
    }
    setFirstDefinition();
  }, [dictionaryDefinitions, setDictDefinition, setType]);

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
