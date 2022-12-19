import { Button, Form, Input } from "antd";
import { UserLogin } from "../../Interface/User";
import { useAppDispatch } from "../../redux/reducer/hook";
import { loginUser } from "../../redux/reducer/userReduce";
export default function LoginSign() {
  const dispatch = useAppDispatch();
  const onFinish = (values: UserLogin) => {
    dispatch(loginUser(values));
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
}
