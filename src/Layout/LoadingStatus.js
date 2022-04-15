import React from 'react';

function LoadingStatus() {
  return (
    <div className="spinner-border text-success" role="status">
       <span className="sr-only">Loading...</span>
    </div>
  );
}

export default LoadingStatus;