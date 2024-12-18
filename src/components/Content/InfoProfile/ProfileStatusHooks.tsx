import React, { useEffect, useState, ChangeEvent } from "react";
import classes from "./InfoProfile.module.css";

type PropsType = {
  status: string;
  updateStatus: (status: string) => void;
  savePhoto: (file: any) => void;
  className: string;
};

const ProfileStatusHooks: React.FC<PropsType> = ({ status, updateStatus }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState<string>(status);

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  const activaiteMode = () => {
    setEditMode(true);
  };
  const deactivaiteEditMode = () => {
    setEditMode(false);
    updateStatus(currentStatus);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentStatus(e.target.value);
  };

  return (
    <div className={classes.status}>
      {!editMode && (
        <div>
          <b>Status:</b>
          <span onDoubleClick={activaiteMode}>{status || "--"}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            autoFocus={true}
            onBlur={deactivaiteEditMode}
            onChange={onStatusChange}
            value={currentStatus}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusHooks;
