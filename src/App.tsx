import "antd/dist/reset.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Spiner from "./components/spiner/Spiner";
import Layout from "./HOC/Layout";
import Detail from "./pages/detail/Detail";
import HomePage from "./pages/homePage/HomePage";
import Room from "./pages/room/Room";

function App() {
  return (
    <div className="">
      <Spiner />
      <BrowserRouter>
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
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
