export type RoomData = {
  id: number;
  tenPhong: string;
  khach: number;
  phongNgu: number;
  giuong: number;
  phongTam: number;
  moTa: string;
  giaTien: number;
  mayGiat: boolean;
  banLa: boolean;
  tivi: boolean;
  dieuHoa: boolean;
  wifi: boolean;
  bep: boolean;
  doXe: boolean;
  hoBoi: boolean;
  banUi: boolean;
  maViTri: string;
  hinhAnh: LinkImg[];
};
export type LinkImg = {
  urlImage: string;
};
export type DescriptionsRoom = {
  id: number;
  tenPhong: string;
  khach: number;
  phongNgu: number;
  giuong: number;
  phongTam: number;
  moTa: string;
  giaTien: number;
  mayGiat: boolean;
  banLa: boolean;
  tivi: boolean;
  dieuHoa: boolean;
  wifi: boolean;
  bep: boolean;
  doXe: boolean;
  hoBoi: boolean;
  banUi: boolean;
  maViTri: number;
  hinhAnh: string;
};
export type NewDesRoom = DescriptionsRoom & AddDescription;
export type AddDescription = {
  newImage: LinkImg[];
  star: number;
  name: string;
  positionRoom: string;
};
export type StatusRoom = {
  id: number;
  maPhong: number;
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: number;
  maNguoiDung: number;
};
export type DateSelect = {
  disDates: Date[];
  disDatesFormat: string[];
};
export type DataComment = {
  content: CommentByClient[];
  average: number;
};
export type CommentByClient = {
  id: number;
  maPhong: number;
  maNguoiBinhLuan: number;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
  avatar: string;
};
export type CommentContent = {
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
};
export interface NewDataComment extends CommentContent {
  maPhong: string;
  maNguoiBinhLuan: number;
}
