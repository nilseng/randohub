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
      {trip.name && <Card.Title className="mb-0">{trip.name}</Card.Title>}
      <p className="small text-right mb-0">{date}</p>
      <div className="image-container">
        {image ? (
          <Card.Img src={image} className="image pb-2" />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
    </Card>
  );
};

export default TripCard;
