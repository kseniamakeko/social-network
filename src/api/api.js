import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    "API-KEY": "c7045cdd-1841-48f5-ab41-bf39c38a3e39"
  }
});

export const usersApi = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },

  unfollow(userId) {
    return instance.delete(`follow/${userId}`);
  },

  follow(userId) {
    return instance.post(`follow/${userId}`);
  },

  getProfile(userId) {
    console.warn("Obsolete method. Please use profileApi object");
    return profileApi.getProfile(userId);
  }
};

export const profileApi = {
  getProfile(userId) {
    return instance.get(`profile/` + userId);
  },
  getStatus(userId) {
    return instance.get(`profile/status/` + userId);
  },
  upadateStatus(status) {
    return instance.put(`profile/status`, { status: status });
  }
};

export const authApi = {
  getMe() {
    return instance.get(`auth/me`);
  }
};
