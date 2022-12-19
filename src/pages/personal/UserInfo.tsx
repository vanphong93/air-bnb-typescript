import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/reducer/hook";

import { Tabs, message, Popconfirm } from "antd";
import moment from "moment";
import { useNavigate, Link } from "react-router-dom";
import { roomServ } from "../../services/roomServices";
import { userServ } from "../../services/userServices";
import { bookSer } from "../../services/bookServices";
import {
  HeartIconInfo,
  SetttingIcon,
  TicketIcon,
} from "../../utilities/IconSvg";
import { localLike } from "../../services/localServices";
import { renderComforts } from "../../utilities/ItemServices";
import { localData, UserInfo } from "../../Interface/User";
import { GetDataTicket } from "../../Interface/Book";
import { DescriptionsRoom } from "../../Interface/Room";
import ModalUpdateUser from "./ModalUpdate";
import AvatarUser from "./AvatarUser";
import { setOff, setOn } from "../../redux/reducer/spinerReducer";
export default function PersonalInfo() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [dataBooking, setDataBooking] = useState<GetDataTicket[] | null>(null);
  const [allRoom, setAllRoom] = useState<DescriptionsRoom[] | null>(null);
  const [dataUser, setDataUser] = useState<UserInfo | null>(null);
  let { infoUser }: { infoUser: localData } = useAppSelector(
    (state) => state.userReducer
  );
  let get_user_ID = infoUser.user.id;
  useEffect(() => {
    dispatch(setOn());
    roomServ
      .getDataBooking(get_user_ID)
      .then((res: any) => {
        setDataBooking(res.content);
        dispatch(setOff());
      })
      .catch((err) => {
        dispatch(setOff());
        console.log(err);
      });
  }, []);
  useEffect(() => {
    roomServ
      .getAllDataRoom()
      .then((res: any) => {
        setAllRoom(res.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    userServ
      .getInfo(get_user_ID)
      .then((res: any) => {
        setDataUser(res.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteBooked = (id: number) => {
    bookSer
      .deleteBooking(id)
      .then(() => {
        message.success("Hủy đặt phòng thành công");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => console.log(err));
  };
  const renderData = (
    dataBooking: GetDataTicket[] | null,
    allRoom: DescriptionsRoom[] | null
  ) => {
    //fix data
    if (dataBooking && allRoom) {
      let newData = dataBooking.map((selectRoom: GetDataTicket) => {
        let index = allRoom.findIndex(
          (item: DescriptionsRoom) => item.id === selectRoom.maPhong
        );
        return { ...selectRoom, ...allRoom[index], idDelete: selectRoom.id };
      });

      return newData.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {newData.map((item) => {
            let {
              id,
              maPhong,
              hinhAnh,
              tenPhong,
              ngayDen,
              ngayDi,
              soLuongKhach,
              idDelete,
            } = item;
            return (
              <section
                key={idDelete}
                className="shadow-md rounded-lg p-5 space-y-5"
              >
                <img
                  onClick={() => {
                    navigate(`/room/${maPhong}`);
                  }}
                  className="hover:cursor-pointer"
                  src={hinhAnh}
                  alt="selectRoom"
                />
                <div className="space-y-5">
                  <span className="font-bold text-xl">{tenPhong}</span>
                  <section>
                    {" "}
                    <span className="span-gray">
                      {moment(ngayDen).format("DD/MM/YYYY")} đến
                    </span>
                    <span className="span-gray">
                      {moment(ngayDi).format("DD/MM/YYYY")} đi
                    </span>
                    <span className="span-gray">{soLuongKhach} người</span>
                    <Popconfirm
                      okType="default"
                      title="Phòng sẽ hủy vé của bạn ?"
                      onConfirm={() => {
                        deleteBooked(idDelete);
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <span className="span-gray hover:cursor-pointer hover:text-blue-500 bg-red-500">
                        Hủy phòng
                      </span>
                    </Popconfirm>
                  </section>
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <p className="h-56 text-left text-xl font-semibold">
          Hiện bạn vẫn chưa đặt vé phòng nào !
        </p>
      );
    }
    return;
  };
  const renderPersonal = (data: UserInfo | null) => {
    if (data) {
      let { name, email, phone, birthday, gender, role } = data;
      return (
        <div className="flex space-x-3">
          <section>
            <p>
              Tên <b> {name} </b>
            </p>
            <p>
              Email <b>{email}</b>
            </p>
            <p>
              Số điện thoại <b>{phone}</b>
            </p>
            <p>
              Ngày sinh <b>{birthday}</b>
            </p>
            <p>
              Giới tính <b>{gender ? "Nam" : "Nữ"}</b>
            </p>
            <p>{role === "USER" ? "Khách hàng" : "Admin"}</p>
            <ModalUpdateUser dataUser={data} />
          </section>
          <AvatarUser />
        </div>
      );
    }
    return;
  };
  const renderLikeRoom = (data: DescriptionsRoom[] | null) => {
    if (data) {
      let likeRoom: Array<Number> = localLike.like.get();
      let newData = likeRoom.map((room) => {
        return data.filter((item) => {
          return item.id === room;
        })[0];
      });
      return newData.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 my-5 gap-10">
          {newData.map((item) => {
            let {
              id,
              hinhAnh,
              tenPhong,
              khach,
              phongNgu,
              phongTam,
              giuong,
              giaTien,
            } = item;
            return (
              <section key={id} className="shadow-lg rounded  duration-300">
                <div className="p-3">
                  <h2 className=" text-lg font-bold">{tenPhong}</h2>
                  <img
                    className="hover:cursor-pointer"
                    onClick={() => {
                      navigate(`/room/${id}`);
                    }}
                    src={hinhAnh}
                    alt="mainImage"
                  />
                  <div className="pt-4 pb-2">
                    <span className="span-gray">{khach} khách</span>
                    <span className="span-gray">{phongNgu} phòng ngủ</span>
                    <span className="span-gray">{giuong} giường</span>
                    <span className="span-gray">{phongTam} phòng tắm</span>
                    <span className="span-gray bg-yellow-300">
                      {giaTien}$/đêm
                    </span>
                    <Link
                      to={`/room/${id}`}
                      className="span-gray text-gray-50  bg-red-500"
                    >
                      Chi tiết
                    </Link>
                  </div>
                  <div className="flex">
                    {" "}
                    {renderComforts(item, "mx-1", null)}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <p className="h-56 text-left text-xl font-semibold">
          Hiện bạn vẫn chưa like phòng nào !
        </p>
      );
    }
    return;
  };
  const items = [
    {
      label: (
        <span className="flex items-center">
          Phòng đã đặt
          <TicketIcon />
        </span>
      ),
      key: "item-1",
      children: renderData(dataBooking, allRoom),
    },
    {
      label: (
        <span className="flex items-center">
          Like Room
          <HeartIconInfo />
        </span>
      ),
      key: "item-2",
      children: renderLikeRoom(allRoom),
    },
    {
      label: (
        <span className="flex items-center">
          Cá nhân
          <SetttingIcon />
        </span>
      ),
      key: "item-3",
      children: renderPersonal(dataUser),
    },
  ];
  return (
    <div className="container mx-auto pt-20 pb-10">
      {" "}
      <Tabs type="card" defaultActiveKey="1" centered items={items} />
    </div>
  );
}
