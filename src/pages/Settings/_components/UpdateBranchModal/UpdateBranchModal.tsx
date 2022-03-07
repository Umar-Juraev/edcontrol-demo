import { FC, useEffect, useState } from "react";
import { Form } from "antd";
import toast from "react-hot-toast";

import { FormElements, Button, Modal } from "components/shared";
import { BuildingIcon, LocationIcon } from "components/svg";
import { parsePhoneNumber } from "utils";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const UpdateBranchModal: FC<Props> = ({ visible, setVisible }) => {
 
  return (
    <Modal
      title="Yangi filial"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form  layout="vertical">
        <Form.Item label="Rasm yuklash">
          <FormElements.Upload dragger />
        </Form.Item>

        <Form.Item
          name="name"
          label="Filial nomi:"
          rules={[{ required: true, message: "Filial nomi majburiy" }]}
        >
          <FormElements.Input suffix={<BuildingIcon />} />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Telefon raqam:"
          rules={[{ required: true, message: "Telefon raqam majburiy" }]}
        >
          <FormElements.PhoneInput />
        </Form.Item>

        <Form.Item name="region" label="Viloyat" >
          <FormElements.Select
            placeholder="Toshkent shahri"
          
          />
        </Form.Item>

        <Form.Item name="district" label="Tuman" rules={[{ required: true, message: "Tuman majburiy" }]}>
          <FormElements.Select
         
          />
        </Form.Item>

        <Form.Item name="address" label="Manzil">
          <FormElements.Input suffix={<LocationIcon />} />
        </Form.Item>

        <Button
          fullWidth
          type="primary"
          htmlType="submit"
          size="large"
        
        >
          Yangi filial qo'shish
        </Button>
      </Form>
    </Modal>
  );
};

export default UpdateBranchModal;
