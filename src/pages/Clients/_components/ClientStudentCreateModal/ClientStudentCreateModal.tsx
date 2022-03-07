import React, { FC, useEffect, useState } from "react";
import { Form } from "antd";
import moment from "moment";
import toast from "react-hot-toast";

import { GENDER_TYPE } from "constants/states";
import { checkObjectValueExist, parsePhoneNumber } from "utils";
import { Button, FormElements, Modal } from "components/shared";
// import {
//   useDistrictsQuery,
//   useRegionsQuery,
//   useCreateExtraPhoneNumberMutation,
//   useCreateStudentMutation,
//   useCreatePupilMutation,
//   useGroupsFullQuery,
//   useCreatePhotoMutation,
//   useUpdateClientMutation,
//   useStatusesQuery
// } from "store/endpoints";
// import { ClientsDTO } from "types";
import { useAppSelector } from "store/hooks";

export type Props = {
  selectedClient?: any
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const ClientStudentCreateModal: FC<Props> = ({ selectedClient, visible, setVisible }) => {
  const [form] = Form.useForm()
  const [regionId, setRegionId] = useState<number>()
  const [file, setFile] = useState<any>(null);



  return (
    <Modal
      title="Yangi talaba qo'shish"
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <Form
        name="basic"
        // onFinish={onFinish}
        form={form}
        layout="vertical"
      >

        <Form.Item label="Rasm yuklash">
          <FormElements.Upload dragger  />
        </Form.Item>

        <Form.Item name="full_name" label="To'liq ismi" rules={[{ required: true, message: "ism majburiy" }]}>
          <FormElements.Input />
        </Form.Item>

        <Form.Item name="phone_number" label="Telefon raqam" rules={[{ required: true, message: "telefon raqam majburiy" }]}>
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
            // loading={groupsQuery.isFetching}
            // options={groupsQuery.data?.map((item) => ({
            //   title: item.name,
            //   value: item.id,
            //   key: item.id,
            // }))}
          />
        </Form.Item>

        <FormElements.InputGenerator
          name="parent_extra_phone_numbers"
          label="Ota-ona telefon raqami"
          keyName="value"
          buttonName="Ota-ona telefonini qo'shish"
        >
          <FormElements.PhoneInput />
        </FormElements.InputGenerator>

        <Form.Item name="region" label="Viloyat" >
          <FormElements.Select
            placeholder="Toshkent shahri"
            // loading={regionsQuery.isFetching}
            onSelect={(e: any) => setRegionId(e)}
            // options={regionsQuery.data?.map((item) => ({
            //   title: item.name,
            //   value: item.id,
            //   key: item.id,
            // }))}
          />
        </Form.Item>

        <Form.Item name="district" label="Tuman" rules={[{ required: true, message: "Tuman majburiy" }]}>
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

        <Button
          type="primary"
          htmlType="submit"
          fullWidth
          size="large"
          // disabled={studentMutationLoading || pupilMutationLoading || extraPhoneMutationLoading}
          // loading={studentMutationLoading || pupilMutationLoading || extraPhoneMutationLoading}
        >
          Tasdiqlash
        </Button>
      </Form>
    </Modal >
  );
};

export default ClientStudentCreateModal;
