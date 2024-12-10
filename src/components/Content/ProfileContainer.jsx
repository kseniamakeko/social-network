import React, { useEffect } from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getStatus,
  getUserProfile,
  updateStatus,
  savePhoto,
  saveProfile
} from "../Redux/ProfileReducer";
import { useParams, useNavigate } from "react-router-dom";
import { compose } from "redux";

function ProfileContainer(props) {
  const { userId } = useParams();
  const navigate = useNavigate();

  const finalUserId = userId || props.authorizedUserId;
  const isOwner = finalUserId === props.authorizedUserId;
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
        isOwner={isOwner}
        {...props}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        savePhoto={props.savePhoto}
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
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile
  })
)(ProfileContainer);
