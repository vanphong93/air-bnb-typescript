import { DateSelect } from "./Room";
import { localData } from "./User";

export type TicketInfo = {
  ngayDen: Date | null;
  ngayDi: Date | null;
  nguoiLon: number;
  treEm: number;
};
export type Props = {
  giaTien: number;
  id: number;
  khach: number;
  isStatus: DateSelect;
};
export type RangeDaySelect = [Date | null, Date | null];
export type DataUser = { infoUser: localData };
export type DataBook = {
  maNguoiDung: number;
  soLuongKhach: number;
  maPhong: number;
  ngayDen: string;
  ngayDi: string;
};
export type GetDataTicket = DataBook & { id: number };
