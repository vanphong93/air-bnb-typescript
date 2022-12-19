import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { dataUrlImage } from "../../assets/dataImage";
import { randomNumber } from "../../utilities/randomNumber";
import { roomServ } from "../../services/roomServices";
import { randomName } from "../../utilities/randomName";
import { arrayDisabledDays } from "../../utilities/functionDay";
import ServicesRoom from "./ServicesRoom";
import {
  CommentByClient,
  DataComment,
  DateSelect,
  NewDesRoom,
} from "../../Interface/Room";
import CommentRoom from "./CommentRoom";
import RulesRoom from "./RulesRoom";
import { useAppDispatch } from "../../redux/reducer/hook";

export default function Room() {
  const dispatch = useAppDispatch();
  const { id: idRoom, ["*"]: positionRoom } = useParams();
  const [dataSer, setData] = useState<NewDesRoom | null>(null);
  const [dataComment, setComment] = useState<DataComment | null>(null);
  const [isStatus, setStatus] = useState<DateSelect | null>(null);
  //data servicies
  useEffect(() => {
    idRoom &&
      roomServ
        .getDataRoom(idRoom)
        .then((res: any) => {
          let index_img = randomNumber(dataUrlImage.length, null);
          let name = randomName();
          let newImage = dataUrlImage.slice(index_img, index_img + 6);
          let star = randomNumber(50, 40) / 10;
          let newData = {
            ...res.content,
            newImage,
            star,
            name,
            positionRoom,
          };
          setData(newData);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);
  //is status
  useEffect(() => {
    roomServ
      .getStatusRoom()
      .then((res: any) => {
        let data = res.content.filter((item: any) => {
          return item.maPhong == idRoom;
        });
        let dataSet = {
          disDates: arrayDisabledDays(data).disDates,
          disDatesFormat: arrayDisabledDays(data).disDatesFormat,
        };
        setStatus(dataSet);
      })
      .catch((err) => console.log("err: ", err));
  }, []);
  //data comment
  useEffect(() => {
    idRoom &&
      roomServ
        .getDataComment()
        .then((res: any) => {
          let dataFilter: CommentByClient[] = res.content.filter(
            (item: CommentByClient) => item.maPhong === parseInt(idRoom)
          );
          let totalComment = dataFilter.length;
          let star = 0;
          if (totalComment) {
            star =
              dataFilter.reduce((total: number, item: CommentByClient) => {
                return item.saoBinhLuan + total;
              }, 0) / totalComment;
          }
          let newDataComment = dataFilter.map(
            (item: CommentByClient, i: number) =>
              (item = {
                ...item,
                avatar: `https://i.pravatar.cc/60?img=${i}`,
              })
          );
          let setData = {
            content: newDataComment,
            average: Math.round(star),
          };
          setComment(setData);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);
  const renderSerRoom = (
    data: NewDesRoom | null,
    comment: DataComment | null
  ) => {
    if (data && comment) {
      return (
        <ServicesRoom
          totalPeople={comment.content.length}
          averageStar={comment.average}
          isStatus={isStatus}
          dataSer={data}
        />
      );
    }
    return;
  };
  const renderComment = (data: DataComment | null) => {
    if (idRoom && data) {
      return <CommentRoom idRoom={idRoom} dataComment={data.content} />;
    }
    return;
  };
  return (
    <div className="mx-auto pt-20 px-5 md:px-16 lg:pt-24 sm:px-10">
      {renderSerRoom(dataSer, dataComment)}
      {renderComment(dataComment)}
      <hr />
      <RulesRoom />
    </div>
  );
}
