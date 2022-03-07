import React, { FC, useEffect } from "react";
import { Form } from "antd";
import toast from "react-hot-toast";

import { Button, FormElements, Modal } from "components/shared";
import { useAppSelector } from "store/hooks";
import { BooleanOptions } from "constants/states";

type Props = {
  visible: boolean;
  
  setVisible: (bool: boolean) => void;
  data?: any;
};

const PaymentUpdateModal: FC<Props> = ({ visible, setVisible, data }) => {
  
  return (
    <Modal
      title="To'lov ma'lumotlarini o'zgartirish"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form

        layout="vertical"
      >

        <Form.Item name="user" label="To'lovchi shaxs:" rules={[{ required: true, message: `shaxs majburiy` }]} >
          <FormElements.Select
            showSearch
          />
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

        <Form.Item name="is_canceled" label="Bekor qilinganmi" >
          <FormElements.Select options={BooleanOptions} />
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
          Tasdiqlash
        </Button>
      </Form>
    </Modal >
  );
};

export default PaymentUpdateModal;
