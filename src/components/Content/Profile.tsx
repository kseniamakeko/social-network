import React from "react";
import InfoProfile from "./InfoProfile/InfoProfile";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { ProfileType } from "../../types/types";

type PropsType = {
  isOwner: boolean;
  profile: ProfileType | null;
  status: string;
  updateStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => void;
  goToEditMode: () => void;
  editMode: boolean;
};

const Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
      <InfoProfile
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
        goToEditMode={props.goToEditMode}
        editMode={props.editMode}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
