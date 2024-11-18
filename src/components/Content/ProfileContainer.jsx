import React, { useEffect } from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getStatus,
  getUserProfile,
  updateStatus
} from "../Redux/ProfileReducer";
import { useParams, useNavigate } from "react-router-dom";
import { compose } from "redux";

function ProfileContainer(props) {
  const { userId } = useParams();
  const navigate = useNavigate();

  const finalUserId = userId || props.authorizedUserId;

  useEffect(() => {
    if (!props.isAuth) {
      navigate("/login");
      return;
    }
    props.getUserProfile(finalUserId);
    props.getStatus(finalUserId);
  }, [finalUserId, props.isAuth, navigate]);

  return (
    <div>
      <Profile
        {...props}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
      />
    </div>
  );
}

let mapStateToProps = (state) => ({
  profile: state.profile.profile,
  status: state.profile.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
});

export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus })
)(ProfileContainer);
