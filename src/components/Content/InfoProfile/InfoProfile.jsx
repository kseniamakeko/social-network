import React from "react";
import Preloader from "../../ui/preloader/Preloader";
import ProfileStatusHooks from "./ProfileStatusHooks";
import classes from "./InfoProfile.module.css";

const InfoProfile = ({ profile, status, updateStatus }) => {
  if (!profile) {
    return <Preloader />;
  }
  return (
    <div>
      <div className={classes.main}></div>
      <div className={classes.ava}>
        <div>
          <h2 className={classes.name}>{profile.fullName}</h2>
        </div>
        <img src={profile.photos.large} alt="wall" />
        <ProfileStatusHooks
          status={status}
          updateStatus={updateStatus}
          className={classes.status}
        />
        <div>{profile.contacts.facebook}</div>
        <div>{profile.contacts.vk}</div>
        <div>{profile.contacts.twitter}</div>
      </div>
    </div>
  );
};

export default InfoProfile;
