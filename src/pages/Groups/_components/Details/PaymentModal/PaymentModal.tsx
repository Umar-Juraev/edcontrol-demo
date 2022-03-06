import React, { FC, useEffect } from "react";
import { Form } from "antd";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { useAppSelector } from "store/hooks";
import { Button, FormElements, Modal } from "components/shared";
import {
  usePaymentsQuery,
  useProvidersQuery,
  usePupilsQuery,
  useStudentsQuery,
  useCreatePaymentMutation
} from "store/endpoints";
import { UsersDTO } from "types";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
  user?: UsersDTO;
};

const PaymentModal: FC<Props> = ({ visible, setVisible, user }) => {
  const [form] = Form.useForm()
  const { id } = useParams<{ id: any }>();
  const { currentUser } = useAppSelector(state => state.persistedData)

  const pupilsQuery = usePupilsQuery({ group: id })
  const paymentsQuery = usePaymentsQuery()
  const providersQuery = useProvidersQuery()
  const studentsQuery = useStudentsQuery()

  const [createPayments, { isLoading }] = useCreatePaymentMutation();

  useEffect(() => {
    form.setFieldsValue({
      user: user?.full_name,
      employee: currentUser.data?.full_name
    });
  }, [user, currentUser, form]);

  const onFinish = (values: any) => {
    const studentValues = {
      ...values,
      user: user?.id,
      employee: currentUser.data?.id
    }

    const mutationPromise = createPayments(studentValues).unwrap()

    toast
      .promise(mutationPromise, {
        loading: `To'lov qo'shilmoqda...`,
        success: `Muvaffaqiyatli qo'shildi`,
        error: (({ data }) => JSON.stringify(data))
      })
      .then(() => {
        paymentsQuery.refetch()
        pupilsQuery.refetch()
        studentsQuery.refetch()
        setVisible(false);
      });
  };

  return (
    <Modal
      title="To'lov qilish"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form
        name="basic"
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >

        <Form.Item name="user" label="To'lovchi shaxs:"  >
          <FormElements.Input disabled />
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
          To'lov qilish
        </Button>
      </Form>
    </Modal>
  );
};

export default PaymentModal;
