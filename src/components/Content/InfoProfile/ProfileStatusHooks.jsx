import React, { useEffect, useState } from "react";
import classes from "./InfoProfile.module.css";

const ProfileStatusHooks = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activaiteMode = () => {
    setEditMode(true);
  };
  const deactivaiteEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className={classes.status}>
      {!editMode && (
        <div>
          <b>Status:</b>
          <span onDoubleClick={activaiteMode}>{props.status || "--"}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            autoFocus={true}
            onBlur={deactivaiteEditMode}
            onChange={onStatusChange}
            value={status}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusHooks;
