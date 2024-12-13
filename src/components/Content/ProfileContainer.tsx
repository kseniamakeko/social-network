import React, { useEffect, useState } from "react";
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
import { AppStateType } from "../Redux/Redux-store";
import { ProfileType } from "../../types/types";

type PropsType = MapDispatchPropsType & MapStatePropsType & OwnPropsType;

type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void;
  getStatus: (userId: number) => void;
  updateStatus: (status: string) => void;
  savePhoto: (file: any) => void;
  saveProfile: (profile: ProfileType) => void;
};

type MapStatePropsType = {
  profile: ProfileType;
  status: string;
  authorizedUserId: number | null;
  isAuth: boolean;
};

type OwnPropsType = {
  userId: number;
  finalUserId: number;
};

function ProfileContainer(props: PropsType) {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState<boolean>(false);

  const finalUserId = userId
    ? parseInt(userId, 10) || null
    : props.authorizedUserId;
  const isOwner = finalUserId === props.authorizedUserId;
  useEffect(() => {
    if (!props.isAuth) {
      navigate("/login");
      return;
    }
    if (finalUserId) {
      props.getUserProfile(finalUserId);
      props.getStatus(finalUserId);
    }
  }, [finalUserId, props.isAuth, navigate]);

  // const goToEditMode = () => {
  //   console.log("GoToEditMode");
  // };

  return (
    <div>
      <Profile
        isOwner={isOwner}
        {...props}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        savePhoto={props.savePhoto}
        goToEditMode={() => setEditMode(true)}
        editMode={editMode}
      />
    </div>
  );
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  profile: state.profile.profile,
  status: state.profile.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
});

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    {
      getUserProfile,
      getStatus,
      updateStatus,
      savePhoto,
      saveProfile
    }
  )
)(ProfileContainer);
