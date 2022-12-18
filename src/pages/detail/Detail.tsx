import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import repair from "../../assets/repair.png";
// import "./Detail.css";
import { roomServ } from "../../services/roomServices";
import { randomNumber } from "../../utilities/randomNumber";
import { dataUrlImage } from "../../assets/dataImage";
import { positionSer } from "../../services/positionServices";
import { locationVN } from "../../assets/dataLocation";
import SimpleMap from "./SimpleMap";
import { CurrentPosition, MapCenter } from "../../Interface/Position";
import { LinkImg, RoomData } from "../../Interface/Room";
import { useAppDispatch } from "../../redux/reducer/hook";
import { setOff, setOn } from "../../redux/reducer/spinerReducer";
import { renderComforts } from "../../utilities/ItemServices";
export default function Detail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();
  const [currentPosition, setCurrentPosition] =
    useState<CurrentPosition | null>(null);
  const [centerLocation, setCenterLocation] = useState<MapCenter | null>(null);
  const [dataBook, setDataBook] = useState<RoomData[]>([]);
  useEffect(() => {
    dispatch(setOn());
    roomServ
      .getDataBook(id)
      .then((res: any) => {
        let newData = res.content.map((item: RoomData) => {
          let index = randomNumber(dataUrlImage.length, null);
          let addImage = dataUrlImage.slice(index, index + 4);
          return {
            ...item,
            hinhAnh: [{ urlImage: item.hinhAnh }, ...addImage],
          };
        });
        setDataBook(newData);
        dispatch(setOff());
      })
      .catch((err) => {
        console.log("err: ", err);
        dispatch(setOff());
      });
  }, [id]);
  useEffect(() => {
    positionSer
      .getCurrentPosition(id)
      .then((res: any) => {
        setCurrentPosition(res.content);
        let { tinhThanh } = res.content;
        let index = locationVN.findIndex(
          (item) => item.admin_name === tinhThanh || item.city === tinhThanh
        );
        if (index > -1) {
          let center = {
            lat: +locationVN[index].lat,
            lng: +locationVN[index].lng,
          };
          setCenterLocation(center);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const renderImage = (data: LinkImg[]) =>
    data.map((item, i) => (
      <div key={i}>
        <img
          className="p-2 h-64 mx-auto rounded-xl"
          src={item.urlImage}
          alt="image_detail"
        />
      </div>
    ));
  const renderContent = () => {
    if (dataBook.length) {
      return dataBook.map((item) => {
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
            <Carousel effect="fade">{renderImage(hinhAnh)}</Carousel>
            <div className="p-3">
              {state && (
                <p className="font-medium">
                  Khuyến mãi 50% nhân dịp hè đến {""}
                  <span className="line-through text-xl">{giaTien * 2}$</span>
                </p>
              )}
              <h2 className=" text-lg font-bold">{tenPhong}</h2>
              <div className="pt-4 pb-2">
                <span className="span-gray">{khach} khách</span>
                <span className="span-gray">{phongNgu} phòng ngủ</span>
                <span className="span-gray">{giuong} giường</span>
                <span className="span-gray">{phongTam} phòng tắm</span>
                <span className="span-gray bg-yellow-300  ">
                  {giaTien}$/đêm
                </span>
                <Link
                  to={`/room/${id}/${centerLocation?.lat}/${centerLocation?.lng}`}
                  className="span-gray text-gray-50  bg-red-500"
                >
                  Chi tiết
                </Link>
              </div>
              <div className="flex">{renderComforts(item, "mx-1", null)}</div>
            </div>
          </section>
        );
      });
    }
    return;
  };
  const renderTitle = () => {
    if (currentPosition) {
      let { tenViTri, tinhThanh, quocGia } = currentPosition;
      return (
        <h1 className="text-3xl font-bold">
          Chỗ ở tại khu vực {tenViTri + `,` + tinhThanh + `,` + quocGia}
        </h1>
      );
    }
    return;
  };
  const renderMap = (data: MapCenter | null) => {
    if (data) {
      return <SimpleMap dataBook={dataBook} center={data} />;
    }
    return;
  };
  return (
    <>
      <div className="container mx-auto pt-20 pb-10">
        {renderTitle()}
        {dataBook.length == 0 ? (
          <section>
            <img className="block mx-auto" src={repair} alt="imgRepair" />
            <h1
              onClick={() => {
                navigate("/");
              }}
              className="text-3xl py-5 text-center  text-blue-300 hover:cursor-pointer hover:text-blue-500 duration-300"
            >
              Hệ thống đang cập nhật
            </h1>
          </section>
        ) : (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 my-5 gap-10">
              {renderContent()}
            </div>
            {renderMap(centerLocation)}
          </div>
        )}
      </div>
    </>
  );
}
