import React, { FC, useEffect } from "react";
import { Form } from "antd";
import toast from "react-hot-toast";

import { useAppSelector } from "store/hooks";
import { Button, FormElements, Modal } from "components/shared";
import { checkObjectValueExist, parsePhoneNumber } from "utils";


import classes from "./CreateModalClient.module.scss";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const CreateModalClient: FC<Props> = ({ visible, setVisible }) => {

  return (
    <Modal
      title="Mijoz qoshish"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form

        layout="vertical"
      >
        <Form.Item
          name="full_name"
          label="To'liq ismi:"
          rules={[{ required: true, message: "nomi majburiy" }]}
        >
          <FormElements.Input />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Telefon raqami:"
          rules={[{ required: true, message: "telefon raqam majburiy" }]}
        >
          <FormElements.PhoneInput />
        </Form.Item>

        <Form.Item
          name="source"
          label="Manba:"
          rules={[{ required: true, message: "manba majburiy" }]}
        >
          <FormElements.Select
            showSearch
           
          />
        </Form.Item>

        <Form.Item
          name="direction"
          label="Yo'nalish:"
          rules={[{ required: true, message: "yo'nalish majburiy" }]}
        >
          <FormElements.Select
            showSearch
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status:"
          rules={[{ required: true, message: "status majburiy" }]}
        >
          <FormElements.Select
            showSearch
           
          />
        </Form.Item>

        <Button
          fullWidth
          type="primary"
          htmlType="submit"
          size="large"
        
        >
          Tasdiqlash
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateModalClient;
