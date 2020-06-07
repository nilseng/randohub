import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import SummitModal from "./SummitModal";

const GET_SUMMITS = gql`
  {
    summits {
      _id
      name
      height
    }
  }
`;

const Summits = () => {
  const [newSummit, setNewSummit] = useState({
    name: "placeholder summit",
    height: -10,
  });

  const { loading, error, data } = useQuery(GET_SUMMITS);

  if (error) console.log(error);

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "black",
      }}
    >
      <Container style={{ padding: "1rem 0" }}>
        <Button
          onClick={() =>
            setNewSummit({
              name: "placeholder summit",
              height: 10,
            })
          }
        >
          <FaIcon icon={faPlus} style={{ marginRight: "0.4rem" }}></FaIcon>Add
          Summit
        </Button>
        <SummitModal newSummit={newSummit} setNewSummit={setNewSummit} />
        {loading && <div>loading...</div>}
        {data &&
          data.summits.map((summit) => (
            <Card
              key={summit._id}
              style={{
                padding: "1rem",
                margin: "1rem 0",
                width: "27rem",
                maxWidth: "100%",
                color: "#f8f9fa",
              }}
              bg="dark"
            >
              <Card.Title>{summit.name}</Card.Title>
              <Card.Body>
                <div>Height: {summit.height}</div>
              </Card.Body>
            </Card>
          ))}
      </Container>
    </div>
  );
};

export default Summits;
