import React from "react";
import classes from "./InfoProfile.module.css";
import Preloader from "../../ui/preloader/Preloader";
import ProfileStatus from "./ProfileStatus";

const InfoProfile = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div>
      <div className={classes.main}>
        {/* <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="profile"
        /> */}
      </div>
      <div className={classes.ava}>
        <div>
          <h2 className={classes.name}>{props.profile.fullName}</h2>
        </div>
        <img src={props.profile.photos.large} alt="wall" />
        <ProfileStatus
          status={props.status}
          updateStatus={props.updateStatus}
        />
        <div>{props.profile.contacts.facebook}</div>
        <div>{props.profile.contacts.vk}</div>
        <div>{props.profile.contacts.twitter}</div>
      </div>
    </div>
  );
};

export default InfoProfile;
