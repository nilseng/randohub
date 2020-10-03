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
      hour: "numeric",
      minute: "numeric",
    })
  );

  useEffect(() => {
    fetch("/s3/object/rasletind.jpg").then(async (res) => {
      const imageBlob = await res.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setImage(imageUrl);
    });
  }, []);
  return (
    <Card className="card" bg="dark">
      <p>{date}</p>
      <div className="image-container">
        {image ? (
          <Card.Img src={image} className="image pb-2" />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      {trip.name && <Card.Title>{trip.name}</Card.Title>}
    </Card>
  );
};

export default TripCard;
