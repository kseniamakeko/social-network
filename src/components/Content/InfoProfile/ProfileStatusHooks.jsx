import React, { useState } from "react";
import classes from "./InfoProfile.module.css";

const ProfileStatusHooks = (props) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className={classes.status}>
      {!editMode && (
        <div>
          <span>{props.status || "--"}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input autoFocus={true} />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusHooks;
