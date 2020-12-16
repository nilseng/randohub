import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

import "../styles/Card.scss";
import ImagePlaceholder from "./ImagePlaceholder";

const TripCard = ({ trip }) => {
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

  return (
    <Card className="card my-1" bg="dark">
      <div className="p-1">
        {date && <p className="small mb-0">{date}</p>}
        {trip.createdBy?.name && (
          <p className="small text-muted">{trip.createdBy.name}</p>
        )}
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
