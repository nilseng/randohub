import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const mockSummits = [
  {
    name: "Rasletind",
    height: 2105,
    rating: 10,
  },
  {
    name: "Mugnetind",
    height: 1750,
    rating: 5,
  },
  {
    name: "Mount Everest",
    height: 8848,
    rating: 6,
  },
];

const Summits = () => {
  const summits = mockSummits;
  summits.forEach((summit) => console.log(summit));
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "black",
      }}
    >
      <Container style={{ padding: "1rem 0" }}>
        {summits &&
          summits.map((summit) => (
            <Card
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
                <div>Rating: {summit.rating}</div>
              </Card.Body>
            </Card>
          ))}
      </Container>
    </div>
  );
};

export default Summits;
