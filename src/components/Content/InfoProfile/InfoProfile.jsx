import React, { useState } from "react";
import Preloader from "../../ui/preloader/Preloader";
import ProfileStatusHooks from "./ProfileStatusHooks";
import userPhoto from "../../../assets/image/userPic.png";
import ProfileDataForm from "./ProfileDataForm";
import classes from "./InfoProfile.module.css";

const InfoProfile = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
  const [editMode, setEditMode] = useState(false);
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
        {editMode ? (
          <ProfileDataForm profile={profile} />
        ) : (
          <ProfileData
            profile={profile}
            isOwner={isOwner}
            goToEditMode={() => {
              setEditMode(true);
            }}
          />
        )}
        <ProfileData profile={profile} />
        <ProfileStatusHooks
          status={status}
          updateStatus={updateStatus}
          savePhoto={savePhoto}
          className={classes.status}
        />
        <div>
          <b>Contacts</b>:
          {Object.keys(profile.contacts).map((key) => {
            return (
              <Contact
                className={classes.contactKey}
                contactTitle={key}
                contactValue={profile.contacts[key]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button onClick={goToEditMode}>Edit</button>
        </div>
      )}
      <div>{profile.fullName}</div>
      <div>
        <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
      </div>
      {profile.lookingForAJobDescription && (
        <div>
          <b>My Professional skills: {profile.lookingForAJobDescription} </b>
        </div>
      )}
      <div>
        <b>About me:</b> {profile.aboutme}
      </div>
    </div>
  );
};

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>
        {contactTitle}:{contactValue}
      </b>
    </div>
  );
};

export default InfoProfile;
