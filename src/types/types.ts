export type ProfileType = {
  userId: number;
  lookingForAJob?: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
  aboutMe: string;
};

export type ContactsType = {
  github?: string;
  vk?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
  youtube?: string;
  mainLink?: string;
};

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
  followed: boolean;
};

export type ProfileFormData = {
  userId: number;
  fullName: string;
  lookingForAJob?: boolean;
  lookingForAJobDescription: string;
  aboutMe: string;
  photos: PhotosType;
  contacts: {
    [key: string]: string;
  };
};
