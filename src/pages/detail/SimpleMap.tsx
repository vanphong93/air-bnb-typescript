import GoogleMapReact from "google-map-react";
import { MapIcon } from "../../utilities/IconSvg";
import { Popover } from "antd";
import { Link } from "react-router-dom";
import { randomNumber } from "../../utilities/randomNumber";
import { MapCenter, MapMark } from "../../Interface/Position";
import { RoomData } from "../../Interface/Room";
const MyMark = ({ lat, lng, item }: MapMark) => {
  const content = (
    <div className="flex flex-col w-80 md:w-96">
      <Link
        to={`/room/${item.id}/${lat}/${lng}`}
        className="hover:cursor-pointer text-base font-semibold text-blue-400 hover:text-blue-700 duration-300 "
      >
        {item.tenPhong}
      </Link>
      <img className="mx-auto" src={item.hinhAnh[0].urlImage} alt="img_new" />
    </div>
  );
  return (
    <Popover content={content}>
      <MapIcon />
      <span className="font-semibold text-base text-gray-100">
        {item.giaTien + ""}$
      </span>
    </Popover>
  );
};
export default function SimpleMap({
  center,
  dataBook,
}: {
  center: MapCenter;
  dataBook: RoomData[];
}) {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact center={center} defaultZoom={12}>
        {dataBook.map((item: RoomData) => {
          return (
            <MyMark
              key={item.id}
              lat={center.lat + randomNumber(10, null) * 0.009}
              lng={center.lng + randomNumber(10, null) * 0.009}
              item={item}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
