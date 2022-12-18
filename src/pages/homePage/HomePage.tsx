import { Carousel } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataBanner } from "../../assets/dataBaner";
import { PositionFamous } from "../../Interface/Position";
import { useAppDispatch } from "../../redux/reducer/hook";
import { positionSer } from "../../services/positionServices";
import News from "../news/News";

export default function HomePage() {
  let navigate = useNavigate();
  let dispatch = useAppDispatch;
  const [positionFamous, setPositionFamous] = useState([]);
  const [popHide, setPopHide] = useState(true);
  useEffect(() => {
    positionSer
      .getPositionFamous()
      .then((res: any) => {
        setPositionFamous(res.content.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let getDataItem = (value: PositionFamous) => {
    navigate(`/detail/${value.id}`);
  };
  let renderFamous = () => {
    return positionFamous.map((item: PositionFamous) => {
      let { id, tenViTri, hinhAnh, tinhThanh } = item;
      return (
        <div className="flex items-center" key={id}>
          <img
            onClick={() => {
              getDataItem(item);
            }}
            className="w-24 h-24 ease-in-out shadow-lg rounded-full hover:shadow-blue-500/50 mx-2 hover:scale-110 hover:cursor-pointer duration-300"
            src={hinhAnh}
            alt={tenViTri}
          />
          <h2>{tenViTri + "," + tinhThanh}</h2>
        </div>
      );
    });
  };
  return (
    <>
      {" "}
      <div>
        <Carousel autoplay effect="fade">
          {dataBanner.map((item, i) => {
            return (
              <div key={i}>
                <img
                  className="w-full h-80  lg:h-screen md:h-96"
                  src={item.imgUrl}
                  alt="bannerImg"
                />
              </div>
            );
          })}
        </Carousel>
      </div>
      <section className="container mx-auto py-10">
        <h1 className="font-bold text-3xl">Điểm đến nổi tiếng</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {renderFamous()}
        </div>
      </section>
      <hr className="w-1/2 mx-auto" />
      <section className="container mx-auto pt-8">
        <h1 className="font-bold text-3xl">Ở bất cứ đâu</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10 py-2">
          <section>
            <img
              className=" rounded-2xl ease-in-out shadow-lg  hover:shadow-blue-500/50  hover:scale-105  duration-300"
              src="https://a0.muscache.com/im/pictures/6bf49eb6-e24a-4103-a859-cc9fb9d9e367.jpg?im_w=960"
              alt="img_feature"
            />
            <h3 className="text-center py-3 text-xl">Toàn bộ nhà</h3>
          </section>
          <section>
            <img
              className=" rounded-2xl ease-in-out shadow-lg  hover:shadow-blue-500/50  hover:scale-105  duration-300"
              src="https://a0.muscache.com/im/pictures/0adc1aec-bd6f-4f10-8536-a3bb6faecd20.jpg?im_w=960"
              alt="img_feature"
            />
            <h3 className="text-center py-3 text-xl">Gần gũi thiên nhiên</h3>
          </section>
          <section>
            <img
              className=" rounded-2xl ease-in-out shadow-lg  hover:shadow-blue-500/50  hover:scale-105  duration-300"
              src="https://www.vietnambooking.com/wp-content/uploads/2017/10/khach-san-co-cho-phep-thu-cung-vao-hay-khong-7-7-2018-2.jpg"
              alt="img_feature"
            />
            <h3 className="text-center py-3 text-xl">Mang theo thú cưng</h3>
          </section>
          <section>
            <img
              className=" rounded-2xl ease-in-out shadow-lg  hover:shadow-blue-500/50  hover:scale-105  duration-300"
              src="https://a0.muscache.com/im/pictures/miso/Hosting-29172819/original/8dae018e-ee08-4956-ab90-4a451e96e424.jpeg?im_w=1200"
              alt="img_feature"
            />
            <h3 className="text-center py-3 text-xl">Chỗ ở độc đáo</h3>
          </section>
        </div>
      </section>
      <hr className="w-1/2 mx-auto" />
      {/* {popHide && renderPopUp()} */}
      <div className="container py-5 mx-auto">
        <h1 className="font-bold mb-8 text-3xl">Review</h1>
        <News />
      </div>
    </>
  );
}
