import React from "react";
import { ThreeCircles } from "react-loader-spinner";

export default function Loading({ isEditModal }) {
  return (
    <>
      <div
        className={`d-flex justify-content-md-center align-items-center vh-${
          isEditModal ? "" : "100"
        }`}
        style={{ margin: isEditModal ? "203px" : "" }}
      >
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
}
