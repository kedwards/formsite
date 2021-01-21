import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      <span>
        <FontAwesomeIcon
          style={{ color }}
          icon={
            value >= 1
              ? "star"
              : value >= 0.5
              ? "star-half-alt"
              : ["far", "star"]
          }
        />
        <FontAwesomeIcon
          style={{ color }}
          icon={
            value >= 2
              ? "star"
              : value >= 1.5
              ? "star-half-alt"
              : ["far", "star"]
          }
        />
        <FontAwesomeIcon
          style={{ color }}
          icon={
            value >= 3
              ? "star"
              : value >= 2.5
              ? "star-half-alt"
              : ["far", "star"]
          }
        />
        <FontAwesomeIcon
          style={{ color }}
          icon={
            value >= 4
              ? "star"
              : value >= 3.5
              ? "star-half-alt"
              : ["far", "star"]
          }
        />
        <FontAwesomeIcon
          style={{ color }}
          icon={
            value >= 5
              ? "star"
              : value >= 4.5
              ? "star-half-alt"
              : ["far", "star"]
          }
        />
      </span>
      <span>{text ?? text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

export default Rating;
