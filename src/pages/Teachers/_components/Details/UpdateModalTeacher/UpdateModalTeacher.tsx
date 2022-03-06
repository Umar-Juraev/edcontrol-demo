import React, { FC, useEffect, useState } from "react";
import { Form } from "antd";
import moment from "moment";
import toast from "react-hot-toast";

import { TeachersDTO } from "types";
import { GENDER_TYPE } from "constants/states";
import { checkObjectValueExist, parsePhoneNumber } from "utils";
import { Button, FormElements, Modal } from "components/shared";
import {
  useCreatePhotoMutation,
  useDistrictsQuery,
  useRegionsQuery,
  useUpdateTeacherMutation
} from "store/endpoints";
import { AddIcon } from "components/svg";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
  data?: TeachersDTO;
};

const UpdateModalTeacher: FC<Props> = ({ visible, setVisible, data }) => {
  const [form] = Form.useForm()

  const [file, setFile] = useState<any>(null);
  const [regionId, setRegionId] = useState<number>()
  const [checkSalary, setCheckSalary] = useState(false)

  const regionsQuery = useRegionsQuery()
  const districtsQuery = useDistrictsQuery({ region: regionId })

  const [updateTeacherMutation, { isLoading }] = useUpdateTeacherMutation()
  const [uploadPhotoMutation] = useCreatePhotoMutation();

  useEffect(() => {
    form.setFieldsValue({
      full_name: data?.full_name,
      phone_number: data?.phone_number,
      birth_date: moment(data?.birth_date),
      gender: data?.gender,
      password: data?.password,
      region: data?.district.region_id,
      district: data?.district?.name,
      address: data?.address,
      salary: data?.salary
    });
  }, [data, form]);

  const onFinish = (values: TeachersDTO) => {
    const teacherValues = {
      full_name: values.full_name,
      phone_number: parsePhoneNumber(values.phone_number),
      birth_date: moment(values.birth_date).format('YYYY-MM-DD'),
      branch: data?.branch.id,
      gender: values.gender,
      password: values.password,
      district: !!Number(values.district) ? values.district : data?.district.id,
      address: values.address,
      salary: values.salary
    }
    checkObjectValueExist(teacherValues)

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
          const mutationPromise = updateTeacherMutation({ id: data?.id, ...teacherValues, photo: res.id }).unwrap()

          toast
            .promise(mutationPromise, {
              loading: `o'qituvchi ma'lumotlari yangilanmoqda...`,
              success: `muvaffaqqiyatli yangilandi`,
              error: ({ data }) => JSON.stringify(data),
            })
            .then(() => {
              setVisible(false);
            });
        })
    } else {
      const mutationPromise = updateTeacherMutation({ id: data?.id, ...teacherValues }).unwrap()
      toast
        .promise(mutationPromise, {
          loading: `o'qituvchi ma'lumotlari yangilanmoqda...`,
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
      title="O'qituvchi ma'lumotini o'zgartirish"
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
          initialValue={data?.extra_phone_numbers?.map((item) => ({ value: item.phone_number }))}
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

        <Form.Item name="password" label="Parol" rules={[{ required: true, message: "parol majburiy" }]}>
          <FormElements.Input />
        </Form.Item>

        <Form.Item name="region" label="Viloyat">
          <FormElements.Select
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

        {
          data?.salary || checkSalary
            ? (
              <Form.Item name="salary" label="Maosh" >
                <FormElements.Input />
              </Form.Item>
            ) : (
              <Button
                addMode
                fullWidth
                size="large"
                icon={<AddIcon />}
                onClick={() => setCheckSalary(true)}
                style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}
              >
                Maosh qo'shish
              </Button>
            )
        }

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

export default UpdateModalTeacher;
