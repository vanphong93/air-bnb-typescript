import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { UserLogin } from "../../Interface/User";
import { localServ } from "../../services/localServices";
import { userServ } from "../../services/userServices";
export const loginUser = createAsyncThunk(
  "login",
  async (values: UserLogin) => {
    try {
      const res: any = await userServ.postLogin(values);
      localServ.user.set(res.content);
      message.success("Đăng nhập thành công");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      return res.content;
    } catch (err) {
      console.log("err: ", err);
      message.error("failed");
    }
  }
);
const userReducer = createSlice({
  name: "user",
  initialState: { infoUser: localServ.user.get() },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.infoUser = payload;
    });
  },
});

export default userReducer.reducer;
