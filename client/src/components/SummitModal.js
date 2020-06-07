import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const SummitModal = ({ showModal, setShowModal, createSummit }) => {
  const [summitName, setSummitName] = useState("");
  const [summitHeight, setSummitHeight] = useState("");

  const onSave = () => {
    createSummit({
      variables: { name: summitName, height: +summitHeight },
    });
    handleClose();
  };

  const handleClose = () => {
    setSummitName(undefined);
    setSummitHeight(undefined);
    setShowModal(false);
  };

  return showModal ? (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>
          <Form.Group>
            <Form.Label>Summit Name</Form.Label>
            <Form.Control
              placeholder="E.g. Galdhøpiggen"
              value={summitName}
              onChange={(e) => setSummitName(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Height [mamsl.]</Form.Label>
          <Form.Control
            placeholder="E.g. 2469"
            value={summitHeight}
            onChange={(e) => setSummitHeight(e.target.value)}
          ></Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onSave()}>
          Save
          <FaIcon icon={faCheck} style={{ marginLeft: "0.4rem" }} />
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null;
};

export default SummitModal;
