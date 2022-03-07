import React, { FC, useEffect, useState } from "react";
import { Form } from "antd";
import toast from "react-hot-toast";

import { Modal, FormElements, Button } from "components/shared";
import { checkObjectValueExist } from "utils";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
  data?: any
};

const LessonModal: FC<Props> = ({ visible, setVisible, data }) => {
  return (
    <Modal
      title="Yangi dars qo'shish"
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <Form
        layout="vertical"
      >

        <Form.Item label="Rasm yuklash">
          <FormElements.Upload dragger />
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
    </Modal>
  );
};

export default LessonModal;
