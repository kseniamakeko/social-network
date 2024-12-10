export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
};

export type ContactsType = {};

export type PhotosType = {
  small: string | null;
  large: string | null;
};

export type PostType = {
  id: number;
  message: string;
  likesCount: number;
};

export type UsersType = {
  id: number;
  name: string;
  status: string;
  photos: PhotosType;
};
