
import { Space, Spin } from "antd";
import { useAppSelector } from "../../redux/reducer/hook";

export default function Spiner() {
  let { isLoading } = useAppSelector((state) => state.spinerReducer);
  return (
    <>
      {isLoading && (
        <div className="h-screen w-screen fixed left-0 top-0 bg-black flex justify-center items-center z-30">
          {" "}
          <Space size="middle">
            <Spin size="small" />
            <Spin />
            <Spin size="large" />
          </Space>
        </div>
      )}
    </>
  );
}
