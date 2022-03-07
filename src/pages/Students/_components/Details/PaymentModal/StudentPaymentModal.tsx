import React, { FC, useEffect } from "react";
import { Form } from "antd";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { Button, FormElements, Modal } from "components/shared";

import { useAppSelector } from "store/hooks";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;

};

const StudentPaymentModal: FC<Props> = ({ visible, setVisible }) => {


  return (
    <Modal
      title="To'lov qilish"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form
        name="basic"

        autoComplete="off"
        layout="vertical"
      >

        <Form.Item name="user" label="To'lovchi shaxs:"  >
          <FormElements.Input disabled />
        </Form.Item>

        <Form.Item name="amount" label="To'lov summasi:" rules={[{ required: true, message: 'summa majburiy' }]}>
          <FormElements.Input />
        </Form.Item>

        <Form.Item name="provider" label="To'lov turi:" rules={[{ required: true, message: `to'lov turi majburiy` }]} >
          <FormElements.Select
            showSearch
        
          />
        </Form.Item>

        <Form.Item name="employee" label="Xodim:" >
          <FormElements.Input disabled />
        </Form.Item>

        <Form.Item name="comment" label="Izoh:" >
          <FormElements.Input />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          fullWidth
          size="large"
      
        >
          To'lov qilish
        </Button>
      </Form>
    </Modal>
  );
};

export default StudentPaymentModal;
