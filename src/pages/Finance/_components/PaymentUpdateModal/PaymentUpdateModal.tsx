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
      title="Change of payment information"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form

        layout="vertical"
      >

        <Form.Item name="user" label="Payer:" rules={[{ required: true, message: `Payer is required` }]} >
          <FormElements.Select
            showSearch
          />
        </Form.Item>

        <Form.Item name="amount" label="Payment amount:" rules={[{ required: true, message: 'Payment amount is required' }]}>
          <FormElements.Input />
        </Form.Item>

        <Form.Item name="provider" label="Type of payment:" rules={[{ required: true, message: `Type of payment is required` }]} >
          <FormElements.Select
            showSearch
          />
        </Form.Item>

        <Form.Item name="employee" label="Employee:" >
          <FormElements.Input disabled />
        </Form.Item>

        <Form.Item name="is_canceled" label="Canceled" >
          <FormElements.Select options={BooleanOptions} />
        </Form.Item>

        <Form.Item name="comment" label="Note:" >
          <FormElements.Input />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          fullWidth
          size="large"
        >
        Confirm
        </Button>
      </Form>
    </Modal >
  );
};

export default PaymentUpdateModal;
