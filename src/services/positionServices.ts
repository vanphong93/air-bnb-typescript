import { PositionFamous } from "../Interface/Position";
import { https } from "./configUrl";
export const positionSer = {
  getPosition: () => https.get("/api/vi-tri"),
  getPositionFamous: () =>
    https.get<PositionFamous[]>(
      "/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8"
    ),
  getCurrentPosition: (id: any) => https.get(`/api/vi-tri/${id}`),
  postPosition: (data: any) => https.post("/api/vi-tri", data),
  deletePosition: (id: any) => https.delete(`/api/vi-tri/${id}`),
  editPosition: (id: any, data: any) => https.put(`/api/vi-tri/${id}`, data),
  getDataFromId: (id: any) => https.get(`/api/vi-tri/${id}`),
};
