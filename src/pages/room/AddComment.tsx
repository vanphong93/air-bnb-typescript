import React, { useState } from "react";
import { Rate, Input, message } from "antd";
import { roomServ } from "../../services/roomServices";
import { useAppSelector } from "../../redux/reducer/hook";
import { CommentContent } from "../../Interface/Room";
import { localData } from "../../Interface/User";
const { TextArea } = Input;
const today = new Date();
const date =
  today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
const initialization = {
  ngayBinhLuan: date,
  noiDung: "",
  saoBinhLuan: 3,
};
export default function AddComment({ idRoom }: { idRoom: string }) {
  const { infoUser }: { infoUser: localData } = useAppSelector(
    (state) => state.userReducer
  );
  const [getData, setGetData] = useState<CommentContent>(initialization);
  const onChangeRate = (value: number) => {
    setGetData({ ...getData, saoBinhLuan: value });
  };
  const sendValue = () => {
    if (!infoUser) {
      message.error("Bạn cần đăng nhập để thực hiện chức năng này");
      return;
    }
    let newData = {
      ...getData,
      maPhong: idRoom,
      maNguoiBinhLuan: infoUser.user.id,
    };
    newData.noiDung
      ? roomServ
          .postComment(newData)
          .then((res: any) => {
            message.success(
              "Gửi bình luận thành công, bình luận của bạn đang được cập nhật"
            );
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          })
          .catch((err) => {
            console.log("err: ", err);
            message.error("Gửi bình luận thất bại, xin bạn quay lại sau");
          })
      : message.error("Nội dung không được để trống");
  };
  const onChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGetData({ ...getData, noiDung: event.target.value });
  };
  return (
    <div>
      <TextArea
        rows={4}
        showCount
        maxLength={200}
        onChange={onChangeText}
        placeholder=""
      />
      <button
        onClick={() => {
          sendValue();
        }}
        className="bg-white hover:bg-gray-100 my-1 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Gửi
      </button>{" "}
      <Rate onChange={onChangeRate} defaultValue={3} />
    </div>
  );
}
