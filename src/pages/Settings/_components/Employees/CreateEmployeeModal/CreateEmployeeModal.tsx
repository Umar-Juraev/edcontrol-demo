import React, { FC, useState } from "react";
import moment from "moment";
import { Form } from "antd";
import toast from "react-hot-toast";

import { checkObjectValueExist, parsePhoneNumber } from "utils";
import { useAppSelector } from "store/hooks";
import { Modal, FormElements, Button } from "components/shared";
import { GENDER_TYPE, ROLE_TYPES } from "constants/states";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const CreateEmployeeModal: FC<Props> = ({ visible, setVisible }) => {
  

  return (
    <Modal
      title="Yangi xodim qo'shish"
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <Form
        name="basic"
        layout="vertical"
      >
        <Form.Item label="Rasm yuklash">
          <FormElements.Upload dragger  />
        </Form.Item>

        <Form.Item
          name="full_name"
          label="Xodim to'liq ismi"
          rules={[{ required: true, message: `Ism majburiy` }]}
        >
          <FormElements.Input />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Telefon raqami:"
          rules={[{ required: true, message: "telefon raqam majburiy" }]}
        >
          <FormElements.PhoneInput />
        </Form.Item>

        <Form.Item
          name="birth_date"
          label="Tug'ilgan sana"
          rules={[{ required: true, message: "tug'ilgan sana majburiy" }]}
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
          label="Xodim roli"
          rules={[{ required: true, message: `Roli majburiy` }]}
        >
          <FormElements.Select
            showSearch
            options={ROLE_TYPES}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Paroli"
          rules={[{ required: true, message: `Parol majburiy` }]}
        >
          <FormElements.Input />
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

export default CreateEmployeeModal;
