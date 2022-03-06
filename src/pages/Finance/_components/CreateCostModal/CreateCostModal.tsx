import React, { FC, useEffect, useState } from "react";
import { Form } from "antd";
import toast from "react-hot-toast";

import { checkObjectValueExist } from "utils";
import { Modal, FormElements, Button } from "components/shared";
import { useReasonsQuery, useCreateOutcomeMutation, useEmployeesFullQuery, useTeachersFullQuery } from "store/endpoints";

export type Props = {
  visible: boolean;
  setVisible: (e: boolean) => void;
};

const CreateCostModal: FC<Props> = ({ visible, setVisible }) => {
  const [form] = Form.useForm()
  const [fullEmployee, setFullEmployee] = useState<any[]>([])

  const reasonsQuery = useReasonsQuery()
  const employeesQuery = useEmployeesFullQuery()
  const teachersQuery = useTeachersFullQuery()

  useEffect(() => {
    setFullEmployee([...employeesQuery.data || [], ...teachersQuery.data || []])
  }, [employeesQuery, teachersQuery])

  const [createMutation, { isLoading }] = useCreateOutcomeMutation()

  const onFinish = (values: any) => {
    checkObjectValueExist(values)

    const mutationPromise = createMutation(values).unwrap()
    toast
      .promise(mutationPromise, {
        loading: `qo'shilmoqda...`,
        success: `muvaffaqiyatli qo'shildi`,
        error: ({ data }) => JSON.stringify(data)
      })
      .then((res) => {
        setVisible(false)
        form.resetFields()
      })
  };

  return (
    <Modal
      title="Yangi xarajat qo'shish"
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
      >
        <Form.Item name="name" label="Xarajat nomi:" rules={[{ required: true, message: "nomi majburiy" }]}>
          <FormElements.Input />
        </Form.Item>

        {/* <Form.Item name="created_time" label="Sana:" >
          <FormElements.DatePicker />
        </Form.Item> */}

        <Form.Item name="reason" label="Xarajat sababi" rules={[{ required: true, message: "sababi majburiy" }]}>
          <FormElements.Select
            options={reasonsQuery.data?.map((item) => ({
              title: item.name,
              value: item.id,
              key: item.id
            }))}
          />
        </Form.Item>

        <Form.Item name="employee" label="Xodim:" rules={[{ required: true, message: "xodim majburiy" }]}>
          <FormElements.Select
            options={fullEmployee.map((item) => ({
              title: item.full_name,
              value: item.id,
              key: item.id
            }))}
          />
        </Form.Item>

        <Form.Item name="amount" label="Xarajat miqdori:" rules={[{ required: true, message: "miqdori majburiy" }]}>
          <FormElements.Input />
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
    </Modal>
  );
};

export default CreateCostModal;
