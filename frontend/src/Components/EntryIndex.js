import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { ListGroup } from "react-bootstrap";

const EntryIndex = () => {
  const { entries } = useContext(GlobalContext);

  return (
    <ListGroup variant="flush" className="mt-3">
      {console.log(entries)}
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
    </ListGroup>
  );
};

export default EntryIndex;
