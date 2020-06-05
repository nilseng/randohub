import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faMountain } from "@fortawesome/free-solid-svg-icons";

import { useAuth0 } from "../react-auth0-spa";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <Navbar bg="dark" expand="md" collapseOnSelect>
      <Navbar.Brand style={{ color: "#f8f9fa" }} href="/">
        <span
          style={{
            backgroundColor: "#f8f9fa",
            padding: "0.4rem",
            borderRadius: "0.1rem",
            color: "black",
          }}
        >
          <FaIcon
            icon={faMountain}
            style={{ marginRight: "0.4rem", color: "#343a40" }}
          ></FaIcon>
          Randohub
        </span>
      </Navbar.Brand>
      <Navbar.Toggle
        className="mb-2"
        aria-controls="basic-navbar-nav"
        style={{ outline: "none" }}
      />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Nav.Link href="/summits">Summits</Nav.Link>
          {!isAuthenticated && (
            <Nav.Item>
              <Button
                variant="link"
                className="mr-2"
                onClick={() => loginWithRedirect({})}
              >
                Log In
              </Button>
            </Nav.Item>
          )}
          {isAuthenticated && (
            <>
              <Nav.Item>
                <Nav.Link href="/profile">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Link className="mr-2" onClick={() => logout()}>
                Log out
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
