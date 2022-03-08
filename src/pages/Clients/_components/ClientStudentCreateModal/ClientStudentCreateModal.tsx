import { FC } from "react";
import { Form } from "antd";

import { GENDER_TYPE } from "constants/states";
import { Button, FormElements, Modal } from "components/shared";

export type Props = {
  selectedClient?: any
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const ClientStudentCreateModal: FC<Props> = ({ selectedClient, visible, setVisible }) => {
  return (
    <Modal
      title="Create new student"
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <Form
        name="basic"
        layout="vertical"
      >

        <Form.Item label="Upload image">
          <FormElements.Upload dragger />
        </Form.Item>

        <Form.Item name="full_name" label="Full name" rules={[{ required: true, message: "ism majburiy" }]}>
          <FormElements.Input />
        </Form.Item>

        <Form.Item name="phone_number" label="Phone number" rules={[{ required: true, message: "telefon raqam majburiy" }]}>
          <FormElements.PhoneInput />
        </Form.Item>

        <FormElements.InputGenerator
          name="extra_phone_numbers"
          label="Additional phone number"
          keyName="value"
          buttonName="Add phone number"
        >
          <FormElements.PhoneInput />
        </FormElements.InputGenerator>

        <Form.Item name="birth_date" label="Tug'ilgan sana" rules={[{ required: true, message: "tug'ilgan sana majburiy" }]}>
          <FormElements.DatePicker format="DD MMMM YYYY" />
        </Form.Item>

        <Form.Item name="gender" label="Jinsi">
          <FormElements.Select
            showSearch
            options={GENDER_TYPE.map((item: any) => ({
              title: item.title,
              value: item.value,
              key: item.value,
            }))}
          />
        </Form.Item>

        <Form.Item name="group" label="Guruhi" >
          <FormElements.Select
            showSearch
          />
        </Form.Item>

        <FormElements.InputGenerator
          name="parent_extra_phone_numbers"
          label="Parents phone number"
          keyName="value"
          buttonName="Add parents phone number"
        >
          <FormElements.PhoneInput />
        </FormElements.InputGenerator>

        <Form.Item name="region" label="Region" >
          <FormElements.Select
          />
        </Form.Item>

        <Form.Item name="district" label="District" rules={[{ required: true, message: "Tuman majburiy" }]}>
          <FormElements.Select
          />
        </Form.Item>

        <Form.Item name="address" label="Address">
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

export default ClientStudentCreateModal;
