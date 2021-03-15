import React from "react";
import "./surface-detail.style.css";

export const SurfaceDetail = (props) => {
  const { selectedSurface } = props;
  if (selectedSurface) {
    return (
      <div className="details-container">
        <h1>
          <span>Detail</span>
        </h1>
        <hr />
        <span>Venue Name:</span>
        <span>{props.selectedSurface.venueName}</span>
        <span>Surface Name:</span>
        <span>{props.selectedSurface.surfaceName}</span>
        <span>Status:</span>
        <span>{props.selectedSurface.status}</span>
        <span>Sport:</span>
        <span>{props.selectedSurface.sport}</span>
        <span>Server IP:</span>
        <span>{props.selectedSurface.server.ip4}</span>
      </div>
    );
  } else {
    return <div>No data here</div>;
  }
};
