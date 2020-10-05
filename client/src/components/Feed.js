import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import { useQuery, useMutation } from "react-apollo";
import { useAuth0 } from "../react-auth0-spa";

import TripCard from "./TripCard";
import TripModal from "./TripModal";

const GET_TRIPS = gql`
  {
    trips {
      _id
      name
      description
      createdAt
      images {
        _id
      }
    }
  }
`;

const CREATE_TRIP = gql`
  mutation CreateTrip {
    createTrip {
      _id
      name
      description
      createdAt
      images {
        _id
      }
    }
  }
`;

const UPDATE_TRIP = gql`
  mutation UpdateTrip(
    $_id: ID!
    $name: String
    $description: String
    $summitIds: [ID]
    $imageIds: [ID]
  ) {
    updateTrip(
      _id: $_id
      name: $name
      description: $description
      summitIds: $summitIds
      imageIds: $imageIds
    ) {
      _id
      name
      description
      createdAt
      images {
        _id
      }
    }
  }
`;

const Feed = () => {
  const { user } = useAuth0();

  const [showModal, setShowModal] = useState(false);

  const { loading, error, data } = useQuery(GET_TRIPS);

  if (error) console.log(error);

  const [createTrip] = useMutation(CREATE_TRIP);

  const [updateTrip] = useMutation(UPDATE_TRIP, {
    update(cache, { data: { updateTrip } }) {
      const { trips } = cache.readQuery({ query: GET_TRIPS });
      trips.filter((trip) => trip._id !== updateTrip._id);
      trips.unshift(updateTrip);
      cache.writeQuery({ query: GET_TRIPS, data: { trips: trips } });
    },
  });

  return (
    <Container className="py-4">
      {user && (
        <Button onClick={() => setShowModal(true)}>
          <FaIcon icon={faPlus} className="mr-2"></FaIcon>Legg til tur
        </Button>
      )}
      <TripModal
        showModal={showModal}
        setShowModal={setShowModal}
        createTrip={createTrip}
        updateTrip={updateTrip}
      />
      {loading && <div>loading...</div>}
      {data &&
        data.trips.map((trip) => <TripCard key={trip._id} trip={trip} />)}
    </Container>
  );
};

export default Feed;
