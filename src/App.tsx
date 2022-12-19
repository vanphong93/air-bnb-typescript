import "antd/dist/reset.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AlwaysTop from "./components/scrollTop/AlwaysTop";
import Spiner from "./components/spiner/Spiner";
import Layout from "./HOC/Layout";
import NotFound from "./pages/404/NotFound";
import Detail from "./pages/detail/Detail";
import HomePage from "./pages/homePage/HomePage";
import UserInfo from "./pages/personal/UserInfo";
import Room from "./pages/room/Room";
import { useAppSelector } from "./redux/reducer/hook";

function App() {
  const { infoUser } = useAppSelector((state) => state.userReducer);
  return (
    <div className="">
      <Spiner />
      <BrowserRouter>
      <AlwaysTop />
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />{" "}
          <Route
            path="/detail/:id"
            element={
              <Layout>
                <Detail />
              </Layout>
            }
          />{" "}
          <Route
            path="/room/:id/*"
            element={
              <Layout>
                <Room />
              </Layout>
            }
          />{" "}
          {infoUser ? (
            <Route
              path="/userInfo"
              element={
                <Layout>
                  <UserInfo />
                </Layout>
              }
            />
          ) : (
            <Route path="/userInfo" element={<NotFound />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
