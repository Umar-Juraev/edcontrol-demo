import React, { FC, useState } from "react";
import { Form } from "antd";
import toast from "react-hot-toast";

import { checkObjectValueExist } from "utils";
import { Modal, FormElements, Button } from "components/shared";
import { useAppSelector } from "store/hooks";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const CreateLessonModal: FC<Props> = ({ visible, setVisible }) => {
  return (
    <Modal
      title="Yangi xona qo'shish"
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <Form
        name="basic"
        layout="vertical"
      >

        <Form.Item label="Rasm yuklash">
          <FormElements.Upload dragger  />
        </Form.Item>

        <Form.Item name="name" label="Nomi" rules={[{ required: true, message: `nom majburiy` }]}>
          <FormElements.Input />
        </Form.Item>

        <Form.Item name="capacity" label="Xona sig'imi (necha kishilik)" rules={[{ required: true, message: `sig'im majburiy` }]} >
          <FormElements.Input />
        </Form.Item >

        <Form.Item name="description" label="tavsif" >
          <FormElements.Input />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          fullWidth
          size="large"

        >
          Tasdiqlash
        </Button>
      </Form>
    </Modal >
  );
};

export default CreateLessonModal;
