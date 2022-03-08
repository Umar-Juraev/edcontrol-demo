import { FC } from "react";
import { Form } from "antd";
import { Modal, FormElements, Button } from "components/shared";
import { GENDER_TYPE, ROLE_TYPES } from "constants/states";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const CreateEmployeeModal: FC<Props> = ({ visible, setVisible }) => {


  return (
    <Modal
      title="Add a new employee"
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <Form
        name="basic"
        layout="vertical"
      >
        <Form.Item label="image upload">
          <FormElements.Upload dragger />
        </Form.Item>

        <Form.Item
          name="full_name"
          label="The full name of the employee"
          rules={[{ required: true, message: `name is required` }]}
        >
          <FormElements.Input />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Phone number:"
          rules={[{ required: true, message: "phone number is required" }]}
        >
          <FormElements.PhoneInput />
        </Form.Item>

        <Form.Item
          name="birth_date"
          label="Date of birth"
          rules={[{ required: true, message: "date of birth is required" }]}
        >
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

        <Form.Item
          name="role"
          label="Employee role"
          rules={[{ required: true, message: `role is  required` }]}
        >
          <FormElements.Select
            showSearch
            options={ROLE_TYPES}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="password"
          rules={[{ required: true, message: `password is  required` }]}
        >
          <FormElements.Input />
        </Form.Item>

        <Form.Item name="region" label="region" >
          <FormElements.Select
          />
        </Form.Item>

        <Form.Item name="district" label="District" rules={[{ required: true, message: "District is required" }]}>
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
    </Modal>
  );
};

export default CreateEmployeeModal;
