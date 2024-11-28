import React from "react";
import Preloader from "../../ui/preloader/Preloader";
import ProfileStatusHooks from "./ProfileStatusHooks";
import userPhoto from "../../../assets/image/userPic.png";
import classes from "./InfoProfile.module.css";

const InfoProfile = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
  const onAvatarSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

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
        <img
          src={profile.photos.large || userPhoto}
          alt="profilePhoto"
          className={classes.avatar}
        />
        {isOwner && <input type={"file"} onChange={onAvatarSelected} />}
        <ProfileStatusHooks
          status={status}
          updateStatus={updateStatus}
          savePhoto={savePhoto}
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
