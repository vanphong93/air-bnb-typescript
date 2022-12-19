export type UserLogin = {
  email: string;
  password: string;
};
export type localData = {
  user: UserInfo;
  token: string;
};
export type UserInfo = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  avatar: string;
  gender: boolean;
  role: string;
};
export type UserSign = {
  email: string;
  password: string;
  confirm: number;
  birthday: string;
  gender: boolean | string;
  name: true;
  phone: number;
  agreement: boolean;
};
// export type UserLoginResult = {
//   email: string;
//   password: string;
//   token: string;
// };
// export type resData = {
//   data: {
//     statusCode: number;
//     content: {
//       user: {
//         id: number;
//         name: string;
//         email: string;
//         password: string;
//         phone: string;
//         birthday: string;
//         avatar: string;
//         gender: boolean;
//         role: string;
//       };
//       token: string;
//     };
//     dateTime: string;
//   };
// };
