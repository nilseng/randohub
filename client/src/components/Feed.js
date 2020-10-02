import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import { useQuery, useMutation } from "react-apollo";

import TripCard from "./TripCard";
import TripModal from "./TripModal";

const GET_TRIPS = gql`
  {
    trips {
      _id
      name
    }
  }
`;

const CREATE_TRIP = gql`
  mutation CreateTrip {
    createTrip {
      _id
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
    <Container className="py-4">
      <Button onClick={() => setShowModal(true)}>
        <FaIcon icon={faPlus} className="mr-2"></FaIcon>Legg til tur
      </Button>
      <TripModal
        showModal={showModal}
        setShowModal={setShowModal}
        createTrip={createTrip}
      />
      {loading && <div>loading...</div>}
      {data &&
        data.trips.map((trip) => <TripCard key={trip._id} trip={trip} />)}
    </Container>
  );
};

export default Feed;
