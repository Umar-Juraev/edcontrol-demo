import React, { FC } from "react";
import { Form } from "antd";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { checkObjectValueExist } from "utils";
import { Button, FormElements, Modal } from "components/shared";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const AddStudentModal: FC<Props> = ({ visible, setVisible }) => {
  return (
    <Modal
      title="Talaba qo'shish"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form
        layout="vertical"
      >
        <Form.Item name="user" label="Talaba:" rules={[{ required: true }]}>
          <FormElements.Select
            fullWidth
            showSearch
          
          />
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

export default AddStudentModal;
