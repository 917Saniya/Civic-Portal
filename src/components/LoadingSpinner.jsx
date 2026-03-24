import React from "react";

function LoadingSpinner() {
  return (
    <div className="spinner-wrap" role="status" aria-label="loading">
      <span className="spinner" />
      Loading...
    </div>
  );
}

export default LoadingSpinner;
