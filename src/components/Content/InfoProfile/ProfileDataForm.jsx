const ProfileDataForm = ({ profile }) => {
  return (
    <div>
      <div>
        <button onClick={editmode}>Save</button>
      </div>

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

export default ProfileDataForm;
