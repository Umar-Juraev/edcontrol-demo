import React, { FC, useState } from "react";
import moment from "moment";
import { Form } from "antd";
import toast from "react-hot-toast";

import { checkObjectValueExist, parsePhoneNumber } from "utils";
import { useAppSelector } from "store/hooks";
import { Modal, FormElements, Button } from "components/shared";
import { GENDER_TYPE, ROLE_TYPES } from "constants/states";
import { useRegionsQuery, useDistrictsQuery, useCreateEmployeeMutation, useCreatePhotoMutation } from "store/endpoints";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const CreateEmployeeModal: FC<Props> = ({ visible, setVisible }) => {
  const [form] = Form.useForm()
  const [regionId, setRegionId] = useState<number>()
  const [file, setFile] = useState<any>(null);
  const { currentUser } = useAppSelector(state => state.persistedData)

  const regionsQuery = useRegionsQuery()
  const districtsQuery = useDistrictsQuery({ region: regionId })

  const [createMutation, { isLoading }] = useCreateEmployeeMutation()
  const [uploadPhotoMutation] = useCreatePhotoMutation();

  const onFinish = (values: any) => {
    const employeeValues = {
      ...values,
      phone_number: parsePhoneNumber(values.phone_number),
      birth_date: moment(values.birth_date).format('YYYY-MM-DD'),
      branch: currentUser.data?.branch?.id
    }
    checkObjectValueExist(employeeValues)

    if (file) {
      const formData = new FormData();
      formData.append('file', file.originFileObj)
      const photoMutationPromise = uploadPhotoMutation(formData).unwrap()

      toast
        .promise(photoMutationPromise, {
          loading: `rasm yuklanmoqda...`,
          success: `muvaffaqqiyatli yuklandi`,
          error: ({ data }) => JSON.stringify(data),
        })
        .then((res: any) => {
          const mutationPromise = createMutation({ ...employeeValues, photo: res.id }).unwrap();
          toast
            .promise(mutationPromise, {
              loading: `xodim qo'shilmoqda...`,
              success: `muvaffaqqiyatli qo'shildi`,
              error: ({ data }) => JSON.stringify(data),
            })
            .then(() => {
              setVisible(false);
              form.resetFields()
            });
        })
    } else {
      const mutationPromise = createMutation(employeeValues).unwrap();
      toast
        .promise(mutationPromise, {
          loading: `xodim qo'shilmoqda...`,
          success: `muvaffaqqiyatli qo'shildi`,
          error: ({ data }) => JSON.stringify(data),
        })
        .then((res) => {
          setVisible(false);
          form.resetFields()
        });
    }
  };

  function onChangeUpload(e?: any) {
    if (e.file.status === 'done') {
      setFile(e.file)
    } else if (e.file.status === 'removed') {
      setFile(null)
    }
  };

  return (
    <Modal
      title="Yangi xodim qo'shish"
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <Form
        name="basic"
        onFinish={onFinish}
        layout="vertical"
        form={form}
      >
        <Form.Item label="Rasm yuklash">
          <FormElements.Upload dragger onChange={onChangeUpload} />
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
            loading={regionsQuery.isFetching}
            onSelect={(e: number) => setRegionId(e)}
            options={regionsQuery.data?.map((item) => ({
              title: item.name,
              value: item.id,
              key: item.id,
            }))}
          />
        </Form.Item>

        <Form.Item name="district" label="Tuman" rules={[{ required: true, message: "Tuman majburiy" }]}>
          <FormElements.Select
            loading={districtsQuery.isFetching}
            options={districtsQuery.data?.map((item) => ({
              title: item.name,
              value: item.id,
              key: item.id,
            }))}
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
          loading={isLoading}
          disabled={isLoading}
        >
          Tasdiqlash
        </Button>
      </Form>
    </Modal>
  );
};

export default CreateEmployeeModal;
