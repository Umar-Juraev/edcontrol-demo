import React, { FC, useState } from "react";
import { Form } from "antd";
import moment from "moment";
import toast from "react-hot-toast";

// import { TeachersDTO } from "types";
import { checkObjectValueExist, parsePhoneNumber } from "utils";
import { GENDER_TYPE } from "constants/states";
import { Button, FormElements, Modal } from "components/shared";
// import {
//   useDistrictsQuery,
//   useRegionsQuery,
//   useCreateExtraPhoneNumberMutation,
//   useCreateTeacherMutation,
//   useCreatePhotoMutation,
// } from "store/endpoints";
import { AddIcon } from "components/svg";
import { useAppSelector } from "store/hooks";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const TeacherCreateModal: FC<Props> = ({ visible, setVisible }) => {
  const [form] = Form.useForm()
  const [regionId, setRegionId] = useState<number>()
  const [checkSalary, setCheckSalary] = useState(false)



  return (
    <Modal
      title="Yangi o'qituvchi qo'shish"
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <Form name="basic" form={form} layout="vertical">
        <Form.Item label="Rasm yuklash">
          <FormElements.Upload dragger  />
        </Form.Item>

        <Form.Item
          name="full_name"
          label="To'liq ismi"
          rules={[{ required: true, message: "ism majburiy" }]}
        >
          <FormElements.Input />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Telefon raqam"
          rules={[{ required: true, message: "telefon raqam majburiy" }]}
        >
          <FormElements.PhoneInput />
        </Form.Item>

        <FormElements.InputGenerator
          name="extra_phone_numbers"
          label="Qo'shimcha telefon raqam"
          keyName="value"
          buttonName="Qo'shimcha raqam kiritish"
        >
          <FormElements.PhoneInput />
        </FormElements.InputGenerator>

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
          name="password"
          label="Parol"
          rules={[{ required: true, message: "parol majburiy" }]}
        >
          <FormElements.Input />
        </Form.Item>

        <Form.Item name="region" label="Viloyat">
          <FormElements.Select
            onSelect={(e: number) => setRegionId(e)}
            // options={regionsQuery.data?.map((item) => ({
            //   title: item.name,
            //   value: item.id,
            //   key: item.id,
            // }))}
          />
        </Form.Item>

        <Form.Item
          name="district"
          label="Tuman"
          rules={[{ required: true, message: "Tuman majburiy" }]}
        >
          <FormElements.Select
            // loading={districtsQuery.isFetching}
            // options={districtsQuery.data?.map((item) => ({
            //   title: item.name,
            //   value: item.id,
            //   key: item.id,
            // }))}
          />
        </Form.Item>

        <Form.Item name="address" label="Manzil">
          <FormElements.Input />
        </Form.Item>

        {checkSalary ? (
          <Form.Item name="salary" label="Maosh">
            <FormElements.Input />
          </Form.Item>
        ) : (
          <Button
            addMode
            fullWidth
            size="large"
            icon={<AddIcon />}
            onClick={() => setCheckSalary(true)}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            Maosh qo'shish
          </Button>
        )}

        <Button
          type="primary"
          htmlType="submit"
          fullWidth
          size="large"
          // disabled={isLoading}
          // loading={isLoading}
        >
          O'qituvchi qo'shish
        </Button>
      </Form>
    </Modal>
  );
};

export default TeacherCreateModal;
