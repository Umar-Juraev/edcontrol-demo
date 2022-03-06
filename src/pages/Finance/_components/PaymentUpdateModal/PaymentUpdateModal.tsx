import React, { FC, useEffect } from "react";
import { Form } from "antd";
import toast from "react-hot-toast";

import { PaymentsDTO } from "types";
import { Button, FormElements, Modal } from "components/shared";
import { useStudentsFullQuery, useProvidersQuery, useUpdatePaymentMutation } from "store/endpoints";
import { useAppSelector } from "store/hooks";
import { BooleanOptions } from "constants/states";

type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
  data?: PaymentsDTO;
};

const PaymentUpdateModal: FC<Props> = ({ visible, setVisible, data }) => {
  const [form] = Form.useForm()

  const studentsQuery = useStudentsFullQuery()
  const providersQuery = useProvidersQuery()

  const [updateMutation, { isLoading }] = useUpdatePaymentMutation()

  useEffect(() => {
    form.setFieldsValue({
      user: data?.user.id,
      amount: data?.amount,
      provider: data?.provider.id,
      employee: data?.employee.full_name,
      is_canceled: Number(data?.is_canceled),
      comment: data?.comment
    })
  }, [data, form]);

  const onFinish = (values: any) => {
    const updateValues = {
      ...values,
      is_canceled: Boolean(values.is_canceled),
      employee: data?.employee.id
    }

    const mutationPromise = updateMutation({ id: data?.id, ...updateValues }).unwrap()
    toast
      .promise(mutationPromise, {
        loading: `to'lova ma'lumotlari yangilanmoqda...`,
        success: `muvaffaqiyatli yangilandi`,
        error: (({ data }) => JSON.stringify(data))
      })
      .then(() => setVisible(false))
  };

  return (
    <Modal
      title="To'lov ma'lumotlarini o'zgartirish"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >

        <Form.Item name="user" label="To'lovchi shaxs:" rules={[{ required: true, message: `shaxs majburiy` }]} >
          <FormElements.Select
            showSearch
            loading={studentsQuery.isFetching}
            options={studentsQuery.data?.map((item) => ({
              title: item.full_name,
              value: item.id,
              key: item.id,
            }))}
          />
        </Form.Item>

        <Form.Item name="amount" label="To'lov summasi:" rules={[{ required: true, message: 'summa majburiy' }]}>
          <FormElements.Input />
        </Form.Item>

        <Form.Item name="provider" label="To'lov turi:" rules={[{ required: true, message: `to'lov turi majburiy` }]} >
          <FormElements.Select
            showSearch
            options={providersQuery.data?.map((item) => ({
              title: item.name,
              value: item.id,
              key: item.id,
            }))}
          />
        </Form.Item>

        <Form.Item name="employee" label="Xodim:" >
          <FormElements.Input disabled />
        </Form.Item>

        <Form.Item name="is_canceled" label="Bekor qilinganmi" >
          <FormElements.Select options={BooleanOptions} />
        </Form.Item>

        <Form.Item name="comment" label="Izoh:" >
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

export default PaymentUpdateModal;
