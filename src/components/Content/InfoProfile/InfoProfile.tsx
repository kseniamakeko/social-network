import React, { ChangeEvent } from "react";
import Preloader from "../../ui/preloader/Preloader";
import ProfileStatusHooks from "./ProfileStatusHooks";
import userPhoto from "../../../assets/image/userPic.png";
import ProfileDataForm from "./ProfileDataForm";
import classes from "./InfoProfile.module.css";
import {
  ProfileType,
  ContactsType,
  ProfileFormData
} from "../../../types/types";

type PropsType = {
  profile: ProfileFormData | null;
  status: string;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (formData: ProfileFormData) => void;
  updateStatus: (status: string) => void;
  goToEditMode: () => void;
  editMode: boolean;
};

type PropsContactType = {
  contactTitle: string | undefined;
  contactValue: string | undefined;
};

const InfoProfile: React.FC<PropsType> = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
  goToEditMode,
  editMode
}) => {
  // const [editMode, setEditMode] = useState<boolean>(false);
  const onAvatarSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  if (!profile) {
    return <Preloader />;
  }

  const onSubmit = (formData: ProfileFormData): void => {
    saveProfile(formData);
    goToEditMode();
  };

  return (
    <div>
      <div className={classes.main}>
        <div>
          <h2 className={classes.name}>{profile.fullName}</h2>
        </div>
        <img
          src={profile.photos.large || userPhoto}
          alt="profilePhoto"
          className={classes.avatar}
        />
        {isOwner && (
          <input
            type={"file"}
            onChange={onAvatarSelected}
            className={classes.avatarInput}
          />
        )}
        {editMode ? (
          <ProfileDataForm
            initialValues={profile}
            profile={profile}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileData
            profile={profile}
            isOwner={isOwner}
            goToEditMode={goToEditMode}
          />
        )}
        <ProfileStatusHooks
          status={status}
          updateStatus={updateStatus}
          savePhoto={savePhoto}
          className={classes.status}
        />
      </div>
    </div>
  );
};

const ProfileData: React.FC<{
  profile: ProfileType;
  isOwner: boolean;
  goToEditMode: () => void;
}> = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div className={classes.infoProfile}>
      {isOwner && (
        <div className={classes.editBtn}>
          <button onClick={goToEditMode}>edit</button>
        </div>
      )}
      <div>
        <b>Full Name</b>: {profile.fullName}
      </div>
      <div>
        <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
      </div>
      <div>
        <b>My Professional skills</b>: {profile.lookingForAJobDescription}
      </div>
      <div>
        <b>About me</b>: {profile.aboutMe}
      </div>
      <div>
        <b>Contacts</b>:
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key as keyof ContactsType]}
            />
          );
        })}
      </div>
    </div>
  );
};

const Contact: React.FC<PropsContactType> = ({
  contactTitle,
  contactValue
}) => {
  return (
    <div>
      <b>
        {contactTitle}:{contactValue}
      </b>
    </div>
  );
};

export default InfoProfile;
