import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

let mapStateToPropsForNavigate = (state) => ({
  isAuth: state.auth.isAuth
});

const withAuthNavigate = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.isAuth) return <Navigate to="/login" />;

      return <Component {...this.props} />;
    }
  }

  let ConnectedNavigateComponent = connect(mapStateToPropsForNavigate)(
    RedirectComponent
  );

  return ConnectedNavigateComponent;
};

export default withAuthNavigate;
