import { DataBook } from "../Interface/Book";
import {
  DescriptionsRoom,
  NewDataComment,
  RoomData,
  StatusRoom,
} from "../Interface/Room";
import { https } from "./configUrl";
export const roomServ = {
  getDataBook: (id: string) =>
    https.get<RoomData[]>(
      `/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`
    ),
  getDataRoom: (id: string) =>
    https.get<DescriptionsRoom>(`/api/phong-thue/${id}`),
  getDataComment: () => https.get("/api/binh-luan"),
  getAllInfoUser: () => https.get("/api/users"),
  postComment: (data: NewDataComment) => https.post("/api/binh-luan", data),
  postBooking: (data: DataBook) => https.post("/api/dat-phong", data),
  getDataBooking: (id: number) =>
    https.get(`/api/dat-phong/lay-theo-nguoi-dung/${id}`),
  getAllDataRoom: () => https.get("/api/phong-thue"),
  getStatusRoom: () => https.get<StatusRoom[]>(`/api/dat-phong`),
  // getCommentRoom: (idRoom: any) =>
  //   https.get(`/api/binh-luan/lay-binh-luan-theo-phong/${idRoom}`),
  // createRoom: (data: any) => https.post("/api/phong-thue", data),
  // deleteRoom: (idRoom: any) => https.delete(`/api/phong-thue/${idRoom}`),
  // editRoom: (idRoom: any, data: any) =>
  //   https.put(`/api/phong-thue/${idRoom}`, data),
};
