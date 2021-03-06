import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router-dom";

/* const GET_SUMMITS = gql`
  {
    summits {
      _id
      name
      height
    }
  }
`;

const CREATE_SUMMIT = gql`
  mutation CreateSummit($name: String!, $height: Int!) {
    createSummit(name: $name, height: $height) {
      _id
      name
      height
      createdAt
    }
  }
`; */

const Summits = () => {
  // const { user } = useAuth0();
  const history = useHistory();

  /* const { loading, error, data } = useQuery(GET_SUMMITS);

  if (error) console.log(error);

  const [createSummit] = useMutation(CREATE_SUMMIT, {
    update(cache, { data: { createSummit } }) {
      const { summits } = cache.readQuery({ query: GET_SUMMITS });
      cache.writeQuery({
        query: GET_SUMMITS,
        data: { summits: [...summits, createSummit] },
      });
    },
  });
 */
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
            color: "#f8f9fa",
          }}
          bg="dark"
        >
          <Card.Title>Høgdebrotet</Card.Title>
          <Card.Body>
            <div>2226 moh.</div>
          </Card.Body>
          <Button onClick={() => history.push("/map")}>
            <FaIcon icon={faMap} className="mr-2" />
            Se kart
          </Button>
        </Card>
        {/* {user && (
          <Button
            variant="outline-primary text-light"
            onClick={() => setShowModal(true)}
          >
            <FaIcon icon={faPlus} style={{ marginRight: "0.4rem" }}></FaIcon>
            Legg til fjelltopp
          </Button>
        )}
        <SummitModal
          showModal={showModal}
          setShowModal={setShowModal}
          createSummit={createSummit}
        />
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
                <div>Høyde: {summit.height}</div>
              </Card.Body>
            </Card>
          ))} */}
      </Container>
    </div>
  );
};

export default Summits;
