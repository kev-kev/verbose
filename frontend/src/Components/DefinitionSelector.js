import React, { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { Pagination } from "react-bootstrap";

const DefinitionSelector = (props) => {
  const { dictionaryDefinitions } = useContext(GlobalContext);
  const [activeNumber, setActiveNumber] = useState(0);

  const handleOnClick = (i) => {
    setActiveNumber(i);
    props.setDictDefinition(dictionaryDefinitions[i].definition);
  };

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
      <Pagination>
        {items}
        {console.log(activeNumber)}
      </Pagination>
    </>
  );
};

export default DefinitionSelector;
