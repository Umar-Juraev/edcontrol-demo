import React, { FC, useEffect, useState } from "react";
import { Form } from "antd";
import moment from "moment";
import toast from "react-hot-toast";

import { EmployeesDTO } from "types";
import { checkObjectValueExist, parsePhoneNumber } from "utils";
import { Button, FormElements, Modal } from "components/shared";
import { useCreatePhotoMutation, useDistrictsQuery, useRegionsQuery, useUpdateEmployeeMutation } from "store/endpoints";
import { GENDER_TYPE, ROLE_TYPES, USER_ROLE_STATES } from "constants/states";
import { UserRoleCodeTypes } from "utils/types";

type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
  data?: EmployeesDTO;
};

const UpdateEmployeeModal: FC<Props> = ({ visible, setVisible, data }) => {
  const [form] = Form.useForm()
  const [file, setFile] = useState<any>(null);
  const [regionId, setRegionId] = useState<number>()

  const regionsQuery = useRegionsQuery()
  const districtsQuery = useDistrictsQuery({ region: regionId })

  const [updateMutation, { isLoading }] = useUpdateEmployeeMutation()
  const [uploadPhotoMutation] = useCreatePhotoMutation();

  useEffect(() => {
    form.setFieldsValue({
      full_name: data?.full_name,
      phone_number: data?.phone_number,
      birth_date: moment(data?.birth_date),
      gender: data?.gender,
      role: USER_ROLE_STATES[data?.role as UserRoleCodeTypes]?.name,
      password: data?.password,
      district: data?.district.name,
      region: data?.district.region_id,
      address: data?.address,
    })
  }, [data, form]);

  const onFinish = (values: any) => {
    const employeeValues = {
      ...values,
      phone_number: parsePhoneNumber(values.phone_number),
      role: isNaN(values.role) ? data?.role : values.role,
      birth_date: moment(values.birth_date).format('YYYY-MM-DD'),
      district: !!Number(values.district) ? values.district : data?.district.id,
      branch: data?.branch.id
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
          const mutationPromise = updateMutation({ ...employeeValues, id: data?.id, photo: res.id }).unwrap();

          toast
            .promise(mutationPromise, {
              loading: `xodim ma'lumotlari yangilanmoqda...`,
              success: `muvaffaqqiyatli yangilandi`,
              error: ({ data }) => JSON.stringify(data),
            })
            .then(() => {
              setVisible(false);
            });
        })
    } else {
      const mutationPromise = updateMutation({ id: data?.id, ...employeeValues }).unwrap()
      toast
        .promise(mutationPromise, {
          loading: `xodim ma'lumotlari yangilanmoqda...`,
          success: `muvaffaqqiyatli yangilandi`,
          error: (({ data }) => JSON.stringify(data))
        })
        .then(() => {
          setVisible(false);
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
      title="Xodim ma'lumotini o'zgartirish"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
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
    </Modal >
  );
};

export default UpdateEmployeeModal;
