import { https } from "./configUrl";
export const roomServ = {
  getDataBook: (id: any) =>
    https.get(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`),
  getDataRoom: (id: any) => https.get(`/api/phong-thue/${id}`),
  getDataComment: () => https.get("/api/binh-luan"),
  getAllInfoUser: () => https.get("/api/users"),
  postComment: (data: any) => https.post("/api/binh-luan", data),
  postBooking: (data: any) => https.post("/api/dat-phong", data),
  getDataBooking: (id: any) => https.get(`/api/dat-phong/lay-theo-nguoi-dung/${id}`),
  getAllDataRoom: () => https.get("/api/phong-thue"),
  getStatusRoom: () => https.get(`/api/dat-phong`),
  getCommentRoom: (idRoom: any) =>
    https.get(`/api/binh-luan/lay-binh-luan-theo-phong/${idRoom}`),
  createRoom: (data: any) => https.post("/api/phong-thue", data),
  deleteRoom: (idRoom: any) => https.delete(`/api/phong-thue/${idRoom}`),
  editRoom: (idRoom: any, data: any) => https.put(`/api/phong-thue/${idRoom}`, data),
};
