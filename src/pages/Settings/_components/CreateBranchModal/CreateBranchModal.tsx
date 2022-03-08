import { FC } from "react";
import { Form } from "antd";

import { FormElements, Button, Modal } from "components/shared";
import { BuildingIcon, LocationIcon } from "components/svg";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const CreateBranchModal: FC<Props> = ({ visible, setVisible }) => {



  return (
    <Modal
      title="New branch"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form
        layout="vertical"
      >
        <Form.Item label="image upload">
          <FormElements.Upload dragger />
        </Form.Item>

        <Form.Item
          name="name"
          label="Branch name:"
          rules={[{ required: true, message: "Branch name is required" }]}
        >
          <FormElements.Input suffix={<BuildingIcon />} />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Phone number:"
          rules={[{ required: true, message: "Phone number is majburiy" }]}
        >
          <FormElements.PhoneInput />
        </Form.Item>

        <Form.Item name="region" label="Region" >
          <FormElements.Select
          />
        </Form.Item>

        <Form.Item name="district" label="District" rules={[{ required: true, message: "District is required" }]}>
          <FormElements.Select

          />
        </Form.Item>

        <Form.Item name="address" label="Address">
          <FormElements.Input suffix={<LocationIcon />} />
        </Form.Item>

        <Button
          fullWidth
          type="primary"
          htmlType="submit"
          size="large"

        >
          Add a new branch
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateBranchModal;
