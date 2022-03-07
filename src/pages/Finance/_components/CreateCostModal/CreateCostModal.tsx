import  { FC } from "react";
import { Form } from "antd";

import { Modal, FormElements, Button } from "components/shared";

export type Props = {
  visible: boolean;
  setVisible: (e: boolean) => void;
};

const CreateCostModal: FC<Props> = ({ visible, setVisible }) => {



  return (
    <Modal
      title="Yangi xarajat qo'shish"
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <Form
        layout="vertical"
      >
        <Form.Item name="name" label="Xarajat nomi:" rules={[{ required: true, message: "nomi majburiy" }]}>
          <FormElements.Input />
        </Form.Item>

        {/* <Form.Item name="created_time" label="Sana:" >
          <FormElements.DatePicker />
        </Form.Item> */}

        <Form.Item name="reason" label="Xarajat sababi" rules={[{ required: true, message: "sababi majburiy" }]}>
          <FormElements.Select

          />
        </Form.Item>

        <Form.Item name="employee" label="Xodim:" rules={[{ required: true, message: "xodim majburiy" }]}>
          <FormElements.Select
           
          />
        </Form.Item>

        <Form.Item name="amount" label="Xarajat miqdori:" rules={[{ required: true, message: "miqdori majburiy" }]}>
          <FormElements.Input />
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
    </Modal>
  );
};

export default CreateCostModal;
