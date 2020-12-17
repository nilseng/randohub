import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import { useQuery, useMutation } from "react-apollo";
import { useAuth0 } from "../containers/react-auth0-spa";

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
      createdBy {
        sub
        name
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
      createdBy {
        sub
        name
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
      createdBy {
        sub
        name
      }
    }
  }
`;

const DELETE_TRIP = gql`
  mutation DeleteTrip($_id: ID!) {
    deleteTrip(_id: $_id)
  }
`;

const defaultTrip = {
  _id: null,
  name: "Topptur",
  description: "",
  summitIds: null,
  imageIds: [],
};

const Feed = () => {
  const { user, loading: loadingAuth } = useAuth0();

  const [trip, setTrip] = useState(defaultTrip);

  const [showModal, setShowModal] = useState(false);

  const { loading, error, data } = useQuery(GET_TRIPS);

  if (error) console.log(error);

  const [createTrip] = useMutation(CREATE_TRIP);

  const [updateTrip] = useMutation(UPDATE_TRIP, {
    update(cache, { data: { updateTrip } }) {
      let { trips } = cache.readQuery({ query: GET_TRIPS });
      trips = trips.filter((trip) => trip._id !== updateTrip._id);
      trips.unshift(updateTrip);
      cache.writeQuery({ query: GET_TRIPS, data: { trips: trips } });
    },
  });

  const [deleteTrip] = useMutation(DELETE_TRIP, {
    update(cache, { data: { deleteTrip } }) {
      let { trips } = cache.readQuery({ query: GET_TRIPS });
      trips = trips.filter((trip) => trip._id !== deleteTrip);
      cache.writeQuery({ query: GET_TRIPS, data: { trips: trips } });
    },
  });

  if (loadingAuth) return null;

  return (
    <Container className="py-4 px-0">
      {user && (
        <Button onClick={() => setShowModal(true)}>
          <FaIcon icon={faPlus} className="mr-2"></FaIcon>Legg til tur
        </Button>
      )}
      <TripModal
        trip={trip}
        setTrip={setTrip}
        defaultTrip={defaultTrip}
        showModal={showModal}
        setShowModal={setShowModal}
        createTrip={createTrip}
        updateTrip={updateTrip}
        deleteTrip={deleteTrip}
      />
      {loading && <div>loading...</div>}
      {data &&
        data.trips.map((trip) => (
          <TripCard
            key={trip._id}
            trip={trip}
            setTripToEdit={setTrip}
            setShowModal={setShowModal}
          />
        ))}
    </Container>
  );
};

export default Feed;
