import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import { useQuery, useMutation } from "react-apollo";

import TripModal from "./TripModal";

import synshorn_img from "../images/synshorn.jpg";
import mugnetind_img from "../images/mugnetind.jpg";
import rasletind_img from "../images/rasletind.jpg";

const GET_TRIPS = gql`
  {
    trips {
      _id
      name
    }
  }
`;

const CREATE_TRIP = gql`
  mutation CreateTrip($name: String!) {
    createTrip(name: $name) {
      _id
      name
    }
  }
`;

const Feed = () => {
  const [showModal, setShowModal] = useState(false);

  const { loading, error, data } = useQuery(GET_TRIPS);

  if (error) console.log(error);

  const [createTrip] = useMutation(CREATE_TRIP, {
    update(cache, { data: { createTrip } }) {
      const { trips } = cache.readQuery({ query: GET_TRIPS });
      cache.writeQuery({
        query: GET_TRIPS,
        data: { trips: [...trips, createTrip] },
      });
    },
  });

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "black",
      }}
    >
      <Container style={{ padding: "1rem 0" }}>
        <Button onClick={() => setShowModal(true)}>
          <FaIcon icon={faPlus} style={{ marginRight: "0.4rem" }}></FaIcon>Legg
          til tur
        </Button>
        <TripModal
          showModal={showModal}
          setShowModal={setShowModal}
          createTrip={createTrip}
        />
        {loading && <div>loading...</div>}
        {data &&
          data.trips.map((trip) => (
            <Card
              key={trip._id}
              style={{
                padding: "1rem",
                margin: "1rem 0",
                width: "27rem",
                maxWidth: "100%",
                color: "#f8f9fa",
              }}
              bg="dark"
            >
              <Card.Title>{trip.name}</Card.Title>
            </Card>
          ))}
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
