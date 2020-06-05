import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import synshorn_img from "../images/synshorn.jpg";
import mugnetind_img from "../images/mugnetind.jpg";
import rasletind_img from "../images/rasletind.jpg";

const Feed = () => {
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "black",
      }}
    >
      <Container style={{ padding: "1rem 0" }}>
        <Card
          style={{
            padding: "1rem",
            margin: "1rem 0",
            width: "27rem",
            maxWidth: "100%",
          }}
          bg="dark"
        >
          <Card.Img
            src={rasletind_img}
            style={{ width: "100%", paddingBottom: "1rem" }}
          />
          <Card.Title style={{ color: "#f8f9fa" }}>Rasletind 2105</Card.Title>
          <Card.Body style={{ color: "#f8f9fa" }}>
            Det var sol og nice
          </Card.Body>
        </Card>
        <Card
          style={{
            padding: "1rem",
            margin: "1rem 0",
            width: "27rem",
            maxWidth: "100%",
          }}
          bg="dark"
        >
          <Card.Img
            src={synshorn_img}
            style={{ width: "100%", paddingBottom: "1rem" }}
          />
          <Card.Title style={{ color: "#f8f9fa" }}>Synshorn 1475</Card.Title>
          <Card.Body style={{ color: "#f8f9fa" }}>
            Det regnet og var nice
          </Card.Body>
        </Card>
        <Card
          style={{
            padding: "1rem",
            margin: "1rem 0",
            width: "27rem",
            maxWidth: "100%",
          }}
          bg="dark"
        >
          <Card.Img
            src={mugnetind_img}
            style={{ width: "100%", paddingBottom: "1rem" }}
          />
          <Card.Title style={{ color: "#f8f9fa" }}>Mugnetind 1740</Card.Title>
          <Card.Body style={{ color: "#f8f9fa" }}>
            Det regnet ikke og var nice
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Feed;
