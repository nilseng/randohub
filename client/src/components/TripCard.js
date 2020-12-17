import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import "../styles/Card.scss";
import ImagePlaceholder from "./ImagePlaceholder";
import { useAuth0 } from "../containers/react-auth0-spa";

const TripCard = ({ trip, setTripToEdit, setShowModal }) => {
  const { user } = useAuth0();

  const [image, setImage] = useState();

  const [date] = useState(
    new Date(+trip?.createdAt).toLocaleString(undefined, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
  );

  useEffect(() => {
    if (trip.images?.length > 0) {
      fetch(`/s3/object/${trip.images[0]._id}`).then(async (res) => {
        const imageBlob = await res.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setImage(imageUrl);
      });
    }
  }, [trip.images]);

  const onEdit = () => {
    setTripToEdit({ ...trip, imageIds: trip.images.map((img) => img._id) });
    setShowModal(true);
  };

  return (
    <Card className="card my-1" bg="dark">
      <div className="p-1">
        <div className="d-flex justify-content-between">
          <div>
            {date && <p className="small mb-0">{date}</p>}
            {trip.createdBy?.name && (
              <p className="small text-muted">{trip.createdBy.name}</p>
            )}
          </div>
          {user && user.sub === trip.createdBy.sub && (
            <Button variant="link" onClick={onEdit}>
              <FaIcon icon={faPen} className="text-muted"></FaIcon>
            </Button>
          )}
        </div>
        {trip.name && <Card.Title className="mb-0">{trip.name}</Card.Title>}
      </div>
      <div className="card-image-container">
        {image ? (
          <Card.Img src={image} className="card-image rounded-0 pb-2" />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      {trip.description && <p className="text-muted">{trip.description}</p>}
    </Card>
  );
};

export default TripCard;
