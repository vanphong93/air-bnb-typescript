import "antd/dist/reset.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./HOC/Layout";
import Detail from "./pages/detail/Detail";
import HomePage from "./pages/homePage/HomePage";

function App() {
  return (
    <div className="">
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
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
