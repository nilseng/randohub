import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";

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
