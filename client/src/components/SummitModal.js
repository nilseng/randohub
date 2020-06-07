import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const SummitModal = ({ newSummit, setNewSummit }) => {
  const handleClose = () => {
    setNewSummit(null);
  };

  return newSummit ? (
    <Modal show={!!newSummit} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{newSummit.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{newSummit.height}</Modal.Body>
      <Modal.Footer>
        <Button>Edit</Button>
      </Modal.Footer>
    </Modal>
  ) : null;
};

export default SummitModal;
