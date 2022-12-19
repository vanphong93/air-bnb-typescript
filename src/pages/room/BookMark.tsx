import React, { useState, useEffect } from "react";
import { message } from "antd";
import { localLike, localServ } from "../../services/localServices";
import { BookMarkIcon, HeartIcon } from "../../utilities/IconSvg";
import { localData } from "../../Interface/User";

export default function BookMark({ id }: { id: number }) {
  const dataLike: Array<Number> = localLike.like.get();
  const userInfo: localData = localServ.user.get();

  const [isBookMark, setIsBookMark] = useState(false);
  useEffect(() => {
    dataLike.includes(id) && setIsBookMark(true);
  }, []);
  const changeIcon = () => {
    if (!userInfo) {
      message.error("Bạn cần đăng nhập để thực hiện chức năng này");
      return;
    } else {
      setIsBookMark(!isBookMark);
      let i = dataLike.findIndex((item: Number) => item === id);
      i === -1 ? dataLike.push(id) : dataLike.splice(i, 1);
      localLike.like.set(dataLike);
    }
  };
  return (
    <>
      {isBookMark ? (
        <HeartIcon changeIcon={changeIcon} />
      ) : (
        <BookMarkIcon changeIcon={changeIcon} />
      )}
    </>
  );
}
