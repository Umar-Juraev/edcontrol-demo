import React, { FC } from "react";
import { Form } from "antd";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { checkObjectValueExist } from "utils";
import { Button, FormElements, Modal } from "components/shared";
import { usePupilsQuery, useCreatePupilMutation, useStudentsFullQuery } from "store/endpoints";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const AddStudentModal: FC<Props> = ({ visible, setVisible }) => {
  const { id } = useParams<{ id: any }>();

  const studentsQuery = useStudentsFullQuery();
  const pupilsQuery = usePupilsQuery({ group: id })
  const [createMutation, { isLoading }] = useCreatePupilMutation()

  const onFinish = (values: any) => {

    const pupilValues = {
      ...values,
      user: values.user,
      group: id
    }
    checkObjectValueExist(pupilValues)

    const mutationPromise = createMutation(pupilValues).unwrap()

    toast
      .promise(mutationPromise, {
        loading: `qo'shilmoqda...`,
        success: `muvaffaqiyatli qo'shildi`,
        error: (({ data }) => JSON.stringify(data))
      })
      .then(() => {
        setVisible(false);
        studentsQuery.refetch();
        pupilsQuery.refetch();
      });
  };

  return (
    <Modal
      title="Talaba qo'shish"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item name="user" label="Talaba:" rules={[{ required: true }]}>
          <FormElements.Select
            fullWidth
            showSearch
            loading={studentsQuery.isFetching}
            options={studentsQuery.data?.map((item) => ({
              title: item.full_name,
              value: item.id,
              key: item.id,
            }))}
          />
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

export default AddStudentModal;
