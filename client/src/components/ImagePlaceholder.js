import React from "react";
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

import "../styles/ImagePlaceholder.scss";

const ImagePlaceholder = ({ text }) => {
  return (
    <div className="preview-image-placeholder">
      <FaIcon icon={faImages} size="10x" className="text-muted"></FaIcon>
      {text && <p className="text-muted">{text}</p>}
    </div>
  );
};

export default ImagePlaceholder;
