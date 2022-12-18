import { RoomData } from "./Room";

export type PositionFamous = {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
};

export type MapCenter = {
  lat: number;
  lng: number;
};
export type CurrentPosition = {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
};

export type MapMark = {
  lat: number;
  lng: number;
  item: RoomData;
};
export type DataSearch = {
  tinhThanh: string;
  id: number;
};
export type DataAutocomplete = {
  value: DataSearch["tinhThanh"];
  key: DataSearch["id"];
};
