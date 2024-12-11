import axios from "axios";
import { ProfileType } from "../types/types";

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    "API-KEY": "9494c792-add1-48de-bd7f-758b89c98f38"
  }
});

export const usersApi = {
  getUsers(currentPage = 1, pageSize = 5) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },

  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`);
  },

  follow(userId: number) {
    return instance.post(`follow/${userId}`);
  },

  getProfile(userId: number) {
    console.warn("Obsolete method. Please use profileApi object");
    return profileApi.getProfile(userId);
  }
};

export const profileApi = {
  getProfile(userId: number) {
    return instance.get(`profile/` + userId);
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/` + userId);
  },
  upadateStatus(status: string) {
    return instance.put(`profile/status`, { status: status });
  },
  savePhoto(photoFile: string) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  },
  saveProfile(profile: ProfileType) {
    return instance.put(`profile`, profile);
  }
};

export const authApi = {
  getMe() {
    return instance.get(`auth/me`);
  },
  login(email: string, password: string, rememberMe = false, captcha = null) {
    return instance.post(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha
    });
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
