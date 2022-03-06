import React, { FC, useEffect } from "react";
import { Form } from "antd";
import toast from "react-hot-toast";

import { ClientsDTO } from "types";
import { useAppSelector } from "store/hooks";
import { Button, FormElements, Modal } from "components/shared";
import { checkObjectValueExist, parsePhoneNumber } from "utils";

import { useCreateClientMutation, useDirectionsQuery, useSourcesQuery, useStatusesQuery } from "store/endpoints";

import classes from "./CreateModalClient.module.scss";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const CreateModalClient: FC<Props> = ({ visible, setVisible }) => {
  const [form] = Form.useForm()

  const source = useSourcesQuery();
  const directions = useDirectionsQuery();
  const status = useStatusesQuery();
  const { currentUser } = useAppSelector((state) => state.persistedData);

  const [createMutation, { isLoading }] = useCreateClientMutation();

  const onFinish = (values: any) => {
    const clientValues = {
      ...values,
      phone_number: parsePhoneNumber(values.phone_number),
      branch: currentUser.data?.branch?.id,
    };
    checkObjectValueExist(clientValues);

    const mutationPromise = createMutation(clientValues).unwrap();
    toast
      .promise(mutationPromise, {
        loading: `mijoz qo'shilmoqda...`,
        success: `muvaffaqqiyatli qo'shildi`,
        error: ({ data }) => JSON.stringify(data),
      })
      .then((res) => {
        setVisible(false);
        form.resetFields()
      });
  };

  return (
    <Modal
      title="Mijoz qoshish"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form
        onFinish={onFinish}
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="full_name"
          label="To'liq ismi:"
          rules={[{ required: true, message: "nomi majburiy" }]}
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
          name="source"
          label="Manba:"
          rules={[{ required: true, message: "manba majburiy" }]}
        >
          <FormElements.Select
            showSearch
            loading={source.isFetching}
            options={source.data?.map((item) => ({
              title: item.name,
              value: item.id,
              key: item.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="direction"
          label="Yo'nalish:"
          rules={[{ required: true, message: "yo'nalish majburiy" }]}
        >
          <FormElements.Select
            showSearch
            loading={directions.isFetching}
            options={directions.data?.map((item) => ({
              title: item.name,
              value: item.id,
              key: item.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status:"
          rules={[{ required: true, message: "status majburiy" }]}
        >
          <FormElements.Select
            showSearch
            loading={status.isFetching}
            options={status.data?.map((item) => ({
              title: item.name,
              value: item.id,
              key: item.id,
            }))}
          />
        </Form.Item>

        <Button
          fullWidth
          type="primary"
          htmlType="submit"
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

export default CreateModalClient;
