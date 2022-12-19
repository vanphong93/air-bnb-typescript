import { message } from "antd";
import React, { useState } from "react";
import { useAppSelector } from "../../redux/reducer/hook";
import { userServ } from "../../services/userServices";
export default function Avatar() {
  let { infoUser } = useAppSelector((state) => state.userReducer);
  const [imgURL, setImgURL] = useState(infoUser.user.avatar);
  const onChange = (e: any) => {
    if (e) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        return setImgURL(reader.result);
      });
      const formData = new FormData();
      formData.append("formFile", e.target.files[0], "avatar");
      userServ
        .postAvatar(formData)
        .then((res) => {
          message.success("Avatar đã được cập nhật, xin hãy đăng nhập lại");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <p>Thay đổi avatar</p>
      <input className="my-2" onChange={onChange} type="file" />
      <br />
      {imgURL ? <img className="h-32" src={imgURL} alt="avatar" /> : ""}
    </div>
  );
}
