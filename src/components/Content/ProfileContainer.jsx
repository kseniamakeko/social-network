import React, { useEffect } from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getStatus,
  getUserProfile,
  updateStatus
} from "../Redux/ProfileReducer";
import { useParams } from "react-router-dom";
import withAuthNavigate from "../../hoc/withAuthNavigate";
import { compose } from "redux";

function ProfileContainer(props) {
  let { userId } = useParams();
  if (!userId) {
    userId = 31719;
  }
  useEffect(() => {
    props.getUserProfile(userId);
    props.getStatus(userId);
  }, []);

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
  status: state.profile.status
});

export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
  withAuthNavigate
)(ProfileContainer);
