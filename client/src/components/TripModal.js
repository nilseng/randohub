import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import "../styles/TripModal.scss";
import ImagePlaceholder from "./ImagePlaceholder";

const defaultTrip = {
  _id: null,
  name: "Topptur",
  description: null,
  summitIds: null,
  imageIds: null,
};

const TripModal = ({ showModal, setShowModal, createTrip, updateTrip }) => {
  const [trip, setTrip] = useState(defaultTrip);
  const [files, setFiles] = useState();

  const handleShow = async () => {
    const tripWithId = await createTrip();
    setTrip({ ...trip, _id: tripWithId.data.createTrip._id });
  };

  const onSave = async () => {
    await updateTrip({ variables: trip });
    handleClose();
  };

  const handleClose = () => {
    setTrip(defaultTrip);
    setShowModal(false);
    setFiles();
  };

  const handleImageChange = (files) => {
    setFiles(Array.from(files));
  };

  return showModal ? (
    <Modal show={showModal} onHide={handleClose} onShow={handleShow}>
      <Modal.Header>
        <Modal.Title className="w-100">
          <Form.Group>
            <Form.Label>Navn på turen</Form.Label>
            <Form.Control
              placeholder='F.eks. "Fin tur på Rasletind!"'
              value={trip.name}
              onChange={(e) => setTrip({ ...trip, name: e.target.value })}
            ></Form.Control>
          </Form.Group>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="image-container">
          {files?.length > 0 && (
            <Carousel className="h-100">
              {files.map((file) => (
                <Carousel.Item key={file.name}>
                  <Image
                    className="preview-image"
                    src={URL.createObjectURL(file)}
                    rounded
                  />
                  <Carousel.Caption>
                    <p>{files.length} bilde(r) er valgt.</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
          {(!files || files?.length === 0) && (
            <ImagePlaceholder text={"Ingen bilder er valgt."} />
          )}
        </div>
        <Form.Group className="mt-2">
          <Form.File custom>
            <Form.File.Input
              multiple
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files)}
            />
            <Form.File.Label data-browse="Velg bilder">
              Last opp bilder fra turen!
            </Form.File.Label>
          </Form.File>
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
