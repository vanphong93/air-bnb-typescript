import React, { useState } from "react";
import moment from "moment";
import { InputNumber, message, Popover } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { memo } from "react";
import { roomServ } from "../../services/roomServices";
import { totalDay } from "../../utilities/functionDay";
import { useAppSelector } from "../../redux/reducer/hook";
import {
  DataUser,
  Props,
  RangeDaySelect,
  TicketInfo,
} from "../../Interface/Book";
import { initialBook } from "../../utilities/InitialValues";
function BookRoom({ giaTien, id, khach, isStatus }: Props) {
  let { infoUser }: DataUser = useAppSelector((state) => state.userReducer);
  let { disDates, disDatesFormat } = isStatus;
  const [dataBooking, setDataBooking] = useState<TicketInfo>(initialBook);
  const [dateRange, setDateRange] = useState<RangeDaySelect>([null, null]);
  const [startDate, endDate] = dateRange;
  const quantityAdult = (value: number | null) => {
    if (value) {
      setDataBooking({ ...dataBooking, nguoiLon: value });
    }
  };
  const quatityChild = (value: number | null) => {
    if (value) {
      setDataBooking({ ...dataBooking, treEm: value });
    }
  };
  const contentAdult = () => (
    <span>Phòng chỉ chứa tối đa {khach} người lớn</span>
  );
  const contentChild = () => (
    <span>Bạn không cần mua vé cho trẻ dưới 10 tuổi</span>
  );
  const postData = () => {
    if (!infoUser) {
      message.error("Bạn cần đăng nhập để thực hiện");
      return;
    }
    let { ngayDen, nguoiLon, treEm, ngayDi } = dataBooking;
    if (moment(ngayDi).format() == moment(ngayDen).format()) {
      message.error(
        "Bạn không thể chọn ngày giống nhau, nếu thuê 1 ngày hãy chọn ngày đến kế tiếp"
      );
      return;
    }
    let newData = {
      maNguoiDung: infoUser.user.id,
      soLuongKhach: treEm + nguoiLon,
      maPhong: id,
      ngayDen: moment(ngayDen).format("YYYY-MM-DD"),
      ngayDi: moment(ngayDi).format("YYYY-MM-DD"),
    };
    roomServ
      .postBooking(newData)
      .then((res: any) => {
        message.success(
          "Đặt phòng thành công,bạn có thể xem chi tiết ở mục cá nhân"
        );
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        message.error("Đặt phòng thất bại, xin bạn kiểm tra lại");
        console.log(err);
      });
  };
  const renderTotal = () => {
    let { ngayDen, ngayDi, nguoiLon, treEm } = dataBooking;
    let days = totalDay(ngayDi, ngayDen);
    let daysBooking = [];
    for (let i = 0; i < days; i++) {
      let addDay = moment(ngayDen).add(i, "days").format("YYYY-MM-DD");
      !disDatesFormat.includes(addDay) && daysBooking.push(addDay);
    }
    let totalMoney = daysBooking.length * giaTien * (nguoiLon + treEm);
    return (
      <section className="flex justify-between items-center">
        {totalMoney ? (
          <>
            <span className="text-xl text-green-500 font-medium">
              {daysBooking.length} đêm {nguoiLon + treEm} người
            </span>
            <span className="text-yellow-400 text-4xl font-semibold  ">
              {totalMoney} $
            </span>
          </>
        ) : (
          ""
        )}
      </section>
    );
  };
  return (
    <section className="mb-10 h-96 md:ml-5 p-5 shadow-xl border rounded-lg">
      <h4 className="text-2xl font-bold">
        {giaTien}$ /<span className="text-sm">đêm</span>
      </h4>
      <div className="mx-auto">
        <DatePicker
          dateFormat="dd/MM/yyyy"
          className="w-80 text-center"
          placeholderText="Phòng đang hết rất nhanh"
          withPortal
          excludeDates={disDates}
          minDate={new Date()}
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update: RangeDaySelect) => {
            setDataBooking({
              ...dataBooking,
              ngayDen: update[0],
              ngayDi: update[1],
            });
            setDateRange(update);
          }}
          isClearable={true}
        />
        <div className="my-2 flex justify-between items-center text-lg font-medium">
          <Popover content={contentAdult}>
            {" "}
            <span>Người lớn :</span>{" "}
          </Popover>
          <InputNumber
            size="large"
            bordered={false}
            onChange={quantityAdult}
            min={1}
            max={khach}
            defaultValue={1}
          />
        </div>
        <div className="my-2 flex justify-between items-center text-lg font-medium">
          <Popover content={contentChild}>
            {" "}
            <span>Trẻ em :</span>{" "}
          </Popover>
          <InputNumber
            size="large"
            bordered={false}
            onChange={quatityChild}
            min={0}
            max={4}
          />
        </div>
        <hr className="my-2" />
        <div className="h-28">
          <p className="text-center text-xl font-semibold">
            Tổng tiền thanh toán
          </p>
          {renderTotal()}
        </div>
      </div>
      <div className="text-right">
        <button
          onClick={() => {
            postData();
          }}
          className="bg-red-500 text-gray-100 duration-300  hover:bg-red-600 my-1  font-semibold py-2 px-4 rounded"
        >
          Thanh toán
        </button>
      </div>
    </section>
  );
}
export default memo(BookRoom);
