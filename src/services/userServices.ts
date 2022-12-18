import { localData, UserLogin, UserSign } from "../Interface/User";
import { https } from "./configUrl";

export const userServ = {
  postLogin: (data: UserLogin) => https.post("/api/auth/signin", data),
  postSign: (data: UserSign) => https.post("/api/auth/signup", data),
  postRegister: (data: any) => {
    return https.post("/api/auth/signup", data);
  },
  editUser: (id: any, data: any) => https.put(`/api/users/${id}`, data),
  postAvatar: (data: any) => https.post("/api/users/upload-avatar", data),
  getInfo: (id: any) => https.get(`/api/users/${id}`),
  getDataUser: () => {
    return https.get("/api/users");
  },
  searchUser: (name: any) => https.get(`/api/users/search/${name}`),
  deleteUser: (id: any) => https.delete(`/api/users?id=${id}`),
};
