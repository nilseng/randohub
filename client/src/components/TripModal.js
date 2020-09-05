import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const TripModal = ({ showModal, setShowModal, createTrip }) => {
  const [tripName, setTripName] = useState("");

  const onSave = () => {
    createTrip({
      variables: { name: tripName },
    });
    handleClose();
  };

  const handleClose = () => {
    setTripName("");
    setShowModal(false);
  };

  return showModal ? (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>
          <Form.Group>
            <Form.Label>Navn på turen</Form.Label>
            <Form.Control
              placeholder='F.eks. "Fin tur på Rasletind!"'
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Tur-placeholder</Form.Label>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onSave()}>
          Lagre
          <FaIcon icon={faCheck} style={{ marginLeft: "0.4rem" }} />
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null;
};

export default TripModal;
