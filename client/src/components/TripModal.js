import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";

import { getIdTokenClaims, useAuth0 } from "../containers/react-auth0-spa";

import ImagePlaceholder from "./ImagePlaceholder";

import "../styles/TripModal.scss";

const CREATE_IMAGE = gql`
  mutation createImage($tripId: ID) {
    createImage(tripId: $tripId) {
      _id
    }
  }
`;

const TripModal = ({
  trip,
  setTrip,
  defaultTrip,
  showModal,
  setShowModal,
  createTrip,
  updateTrip,
  deleteTrip,
}) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [files, setFiles] = useState();

  const handleShow = async () => {
    if (!trip._id) {
      if (!isAuthenticated) {
        loginWithRedirect({});
      }
      const tripWithId = await createTrip({ variables: trip });
      setTrip({ ...trip, _id: tripWithId.data.createTrip._id });
    }
  };

  const onSave = async () => {
    await saveImages();
    await updateTrip({ variables: trip });
    handleClose();
  };

  const onDiscard = async () => {
    if (trip._id) await deleteTrip({ variables: { _id: trip._id } });
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

  const saveImages = async () => {
    const formData = new FormData();
    if (files) {
      for (const image of Array.from(files)) {
        formData.append("images", image);
        const imageInfo = await createImage({
          variables: { tripId: trip._id },
        });
        trip.imageIds.push(imageInfo.data.createImage._id);
        formData.append("imageIds", imageInfo.data.createImage._id);
      }
      const token = await getIdTokenClaims();
      if (!token) return;
      await fetch("/s3/object", {
        headers: {
          authorization: `Bearer ${token.__raw}`,
        },
        method: "POST",
        body: formData,
      });
    }
  };

  const [createImage] = useMutation(CREATE_IMAGE);

  return showModal && trip ? (
    <Modal show={showModal} onHide={handleClose} onShow={handleShow}>
      <Modal.Header>
        <Modal.Title className="w-100">
          <Form.Group>
            <Form.Label>Navn på turen</Form.Label>
            <Form.Control
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
        <Form.Group>
          <Form.Label>Beskrivelse</Form.Label>
          <Form.Control
            value={trip.description}
            onChange={(e) => setTrip({ ...trip, description: e.target.value })}
            placeholder="Hvordan var turen?"
            as="textarea"
            rows={3}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onDiscard()}>
          Forkast
          <FaIcon icon={faTrash} className="ml-1" />
        </Button>
        <Button onClick={() => onSave()}>
          Lagre
          <FaIcon icon={faCheck} className="ml-1" />
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null;
};

export default TripModal;
