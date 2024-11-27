import React, { Component, Suspense } from "react";
import Preloader from "../components/ui/preloader/Preloader";

const withSuspense = (Component) => (props) => {
  return (
    <Suspense fallback={<Preloader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default withSuspense;
