import React, { FC, useState } from "react";
import { Form } from "antd";
import toast from "react-hot-toast";

import { checkObjectValueExist } from "utils";
import { Modal, FormElements, Button } from "components/shared";
import { useCreatePhotoMutation, useCreateRoomMutation } from "store/endpoints";
import { useAppSelector } from "store/hooks";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const CreateLessonModal: FC<Props> = ({ visible, setVisible }) => {
  const [form] = Form.useForm()
  const { currentUser } = useAppSelector(state => state.persistedData)
  const [file, setFile] = useState<any>(null);

  const [createMutation, { isLoading }] = useCreateRoomMutation()
  const [uploadPhotoMutation] = useCreatePhotoMutation();

  const onFinish = (values: any) => {
    const roomValues = {
      ...values,
      branch: currentUser.data?.branch?.id || 1
    }
    checkObjectValueExist(roomValues)

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
          const mutationPromise = createMutation({ ...roomValues, photo: res.id }).unwrap();
          toast
            .promise(mutationPromise, {
              loading: `xona yaratilmoqda...`,
              success: `muvaffaqqiyatli yaratildi`,
              error: ({ data }) => JSON.stringify(data),
            })
            .then(() => {
              setVisible(false);
              form.resetFields()
            });
        })

    } else {
      const mutationPromise = createMutation(roomValues).unwrap();
      toast
        .promise(mutationPromise, {
          loading: `xona yaratilmoqda...`,
          success: `muvaffaqqiyatli yaratildi`,
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
      title="Yangi xona qo'shish"
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <Form
        name="basic"
        onFinish={onFinish}
        form={form}
        layout="vertical"
      >

        <Form.Item label="Rasm yuklash">
          <FormElements.Upload dragger onChange={onChangeUpload} />
        </Form.Item>

        <Form.Item name="name" label="Nomi" rules={[{ required: true, message: `nom majburiy` }]}>
          <FormElements.Input />
        </Form.Item>

        <Form.Item name="capacity" label="Xona sig'imi (necha kishilik)" rules={[{ required: true, message: `sig'im majburiy` }]} >
          <FormElements.Input />
        </Form.Item >

        <Form.Item name="description" label="tavsif" >
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

export default CreateLessonModal;
