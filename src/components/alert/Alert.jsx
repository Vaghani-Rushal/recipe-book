import React from "react";

export default function Alert({ alert }) {
  return (
    <>
      <div
        className={` alert alert-${alert.type} alert-dismissible fade show position-absolute translate-middle-x my-5`}
        role="alert"
        style={{ zIndex: 9999, right: "0" }}
      >
        {alert.message}
        <button
          type="button"
          className="btn-close me-auto"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={() => setShowSuccessAlert(false)}
        ></button>
      </div>
    </>
  );
}
