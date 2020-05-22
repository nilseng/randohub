import React from "react";
import NavBar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import synshorn_img from "./images/synshorn.jpg";
import mugnetind_img from "./images/mugnetind.jpg";

function App() {
  return (
    <>
      <NavBar bg="dark" expand="md" collapseOnSelect>
        <NavBar.Brand style={{ color: "#f8f9fa" }}>
          Rando
          <span
            style={{
              backgroundColor: "orange",
              paddingTop: "0.1rem",
              paddingBottom: "0.1rem",
              paddingRight: "0.2rem",
              borderRadius: "0.1rem",
              color: "black",
            }}
          >
            hub
          </span>
        </NavBar.Brand>
      </NavBar>
      <div
        style={{ width: "100vw", minHeight: "100vh", backgroundColor: "black" }}
      >
        <Container style={{ padding: "1rem" }}>
          <Card
            style={{ padding: "1rem", margin: "1rem", width: "27rem" }}
            bg="dark"
          >
            <Card.Img
              src={synshorn_img}
              style={{ width: "25rem", paddingBottom: "1rem" }}
            />
            <Card.Title style={{ color: "#f8f9fa" }}>Synshorn 1475</Card.Title>
            <Card.Body style={{ color: "#f8f9fa" }}>
              Det regnet og var nice
            </Card.Body>
          </Card>
          <Card
            style={{ padding: "1rem", margin: "1rem", width: "27rem" }}
            bg="dark"
          >
            <Card.Img
              src={mugnetind_img}
              style={{ width: "25rem", paddingBottom: "1rem" }}
            />
            <Card.Title style={{ color: "#f8f9fa" }}>Mugnetind 1740</Card.Title>
            <Card.Body style={{ color: "#f8f9fa" }}>
              Det regnet ikke og var nice
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
}

export default App;
