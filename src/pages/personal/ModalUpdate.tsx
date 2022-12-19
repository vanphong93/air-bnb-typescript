import React, { useState } from "react";
import { Button, Modal } from "antd";
import FormUser from "./FormUser";
import { UserInfo } from "../../Interface/User";
export default function ModalUpdateUser({ dataUser }: { dataUser: UserInfo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button  onClick={showModal}>
        Update
      </Button>
      <Modal footer={false} open={isModalOpen} onCancel={handleCancel}>
        <FormUser dataUser={dataUser} />
      </Modal>
    </>
  );
}
