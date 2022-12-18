import { https } from "./configUrl";
export const bookSer = {
  getDataBook: (id: any) =>
    https.get(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`),
  postBooking: (data: any) => https.post("/api/dat-phong", data),
  getDataBooking: (id: any) => https.get(`/api/dat-phong/lay-theo-nguoi-dung/${id}`),
  getStatusRoom: () => https.get(`/api/dat-phong`),
  getData: () => https.get("/api/dat-phong"),
  deleteBooking: (id: any) => https.delete(`/api/dat-phong/${id}`),
  getBookedFromId: (id: any) => https.get(`/api/dat-phong/${id}`),
  editBooked: (id: any, data: any) => https.put(`/api/dat-phong/${id}`, data),
};
