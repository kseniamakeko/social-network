import preloader from "../../../assets/image/preloader.svg";
import React from "react";

const Preloader = (props) => {
  return (
    <>
      <div>
        <img src={preloader} alt="" />
      </div>
    </>
  );
};

export default Preloader;
