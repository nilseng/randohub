import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

import "../styles/Card.scss";

const TripCard = ({ trip }) => {
  const [image, setImage] = useState();

  useEffect(() => {
    fetch("/s3/object/rasletind.jpg").then(async (res) => {
      const imageBlob = await res.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setImage(imageUrl);
    });
  }, []);
  return (
    <Card className="card" bg="dark">
      <Card.Img src={image} className="pb-2" />
      {trip.name && <Card.Title>{trip.name}</Card.Title>}
    </Card>
  );
};

export default TripCard;
