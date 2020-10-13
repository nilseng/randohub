import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";

import { useAuth0 } from "../containers/react-auth0-spa";

import ImagePlaceholder from "./ImagePlaceholder";

import "../styles/TripModal.scss";

const defaultTrip = {
  _id: null,
  name: "Topptur",
  description: null,
  summitIds: null,
  imageIds: [],
};

const CREATE_IMAGE = gql`
  mutation createImage($tripId: ID) {
    createImage(tripId: $tripId) {
      _id
    }
  }
`;

const TripModal = ({ showModal, setShowModal, createTrip, updateTrip }) => {
  const { getTokenSilently } = useAuth0();
  let token;

  const [trip, setTrip] = useState(defaultTrip);
  const [files, setFiles] = useState();

  const handleShow = async () => {
    token = await getTokenSilently(); // Make sure token is retrieved before trip is created and updated - needs to be passed to s3 endpoint
    const tripWithId = await createTrip();
    setTrip({ ...trip, _id: tripWithId.data.createTrip._id });
  };

  const onSave = async () => {
    await saveImages();
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
      await fetch("/s3/object", {
        headers: {
          authorization: token,
        },
        method: "POST",
        body: formData,
      });
    }
  };

  const [createImage] = useMutation(CREATE_IMAGE);

  return showModal ? (
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
