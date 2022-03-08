import React, { FC, useEffect, useState } from "react";
import { Form } from "antd";
import moment from "moment";
import toast from "react-hot-toast";

import { checkObjectValueExist, parsePhoneNumber } from "utils";
import { Button, FormElements, Modal } from "components/shared";
import { GENDER_TYPE, ROLE_TYPES, USER_ROLE_STATES } from "constants/states";
import { UserRoleCodeTypes } from "utils/types";

type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const UpdateEmployeeModal: FC<Props> = ({ visible, setVisible }) => {

  return (
    <Modal
      title="Change employee information"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form

        layout="vertical"
      >
        <Form.Item label="Image upload">
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
          rules={[{ required: true, message: "phone number required" }]}
        >
          <FormElements.PhoneInput />
        </Form.Item>

        <Form.Item
          name="birth_date"
          label="date of birth"
          rules={[{ required: true, message: "date of birth is required" }]}
        >
          <FormElements.DatePicker format="DD MMMM YYYY" />
        </Form.Item>

        <Form.Item name="gender" label="Gender">
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
    </Modal >
  );
};

export default UpdateEmployeeModal;
