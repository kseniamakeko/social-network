import axios from "axios";
import { ProfileType } from "../types/types";

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    "API-KEY": "9494c792-add1-48de-bd7f-758b89c98f38"
  }
});

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10
}

type GetUsersType = {
  items: {
    id: number;
    name: string;
    status: string;
    photos: {
      small: string;
      large: string;
    };
    followed: boolean;
  }[];
  totalCount: number;
  error: string;
};

type UnfollowType = {
  resultCode: ResultCodeEnum;
  messages: Array<string>;
  data: {
    userId: number;
  };
};

type FollowType = {
  resultCode: ResultCodeEnum;
  messages: Array<string>;
  data: {
    userId: number;
  };
};

export const usersApi = {
  getUsers(currentPage = 1, pageSize = 5) {
    return instance
      .get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },

  unfollow(userId: number) {
    return instance.delete<UnfollowType>(`follow/${userId}`);
  },

  follow(userId: number) {
    return instance.post<FollowType>(`follow/${userId}`);
  },

  getProfile(userId: number) {
    console.warn("Obsolete method. Please use profileApi object");
    return profileApi.getProfile(userId);
  }
};

type GetProfileApiResponseType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  photos: {
    small: string;
    large: string;
  };
  contacts: {
    github: string;
    vk: string;
    facebook: string;
    instagram: string;
    twitter: string;
    website: string;
    youtube: string;
    mainLink: string;
  };
  aboutMe: string;
};

type UpdateStatusType = {
  data: { status: string };
  resultCode: ResultCodeEnum;
  messages: Array<string>;
};

type savePhotoType = {
  data: {
    photos: {
      small: string;
      large: string;
    };
  };
  resultCode: ResultCodeEnum;
  messages: Array<string>;
};

type saveProfileDataType = {
  data: {};
  resultCode: ResultCodeEnum;
  messages: Array<string>;
};

export const profileApi = {
  getProfile(userId: number) {
    return instance
      .get<GetProfileApiResponseType>(`profile/` + userId)
      .then((res) => res.data);
  },
  getStatus(userId: number) {
    return instance
      .get<string>(`profile/status/` + userId)
      .then((res) => res.data);
  },
  upadateStatus(status: string) {
    return instance
      .put<UpdateStatusType>(`profile/status`, { status: status })
      .then((res) => res.data);
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance
      .put<savePhotoType>(`profile/photo`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then((res) => res.data);
  },
  saveProfile(profile: ProfileType) {
    return instance
      .put<saveProfileDataType>(`profile`, profile)
      .then((res) => res.data);
  }
};

type MeResponseType = {
  data: { id: number; email: string; login: string };
  resultCode: ResultCodeEnum;
  messages: Array<string>;
};

type LoginResponseType = {
  data: { UserId: number };
  resultCode: ResultCodeEnum;
  messages: Array<string>;
};

export const authApi = {
  getMe() {
    return instance.get<MeResponseType>(`auth/me`).then((res) => res.data);
  },
  login(
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: null | string = null
  ) {
    return instance
      .post<LoginResponseType>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha
      })
      .then((res) => res.data);
  },
  logout() {
    return instance.delete(`auth/login`);
  }
};

export const securityApi = {
  getCaptcha() {
    return instance.get(`security/get-captcha-url`);
  }
};
