import React, { FC, useEffect, useState } from "react";
import { Form } from "antd";
import toast from "react-hot-toast";

import { useCreatePhotoMutation, useUpdateRoomMutation } from "store/endpoints";
import { Modal, FormElements, Button } from "components/shared";
import { checkObjectValueExist } from "utils";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
  data?: any
};

const LessonModal: FC<Props> = ({ visible, setVisible, data }) => {
  const [form] = Form.useForm()
  const [file, setFile] = useState<any>(null);

  const [updateMutation, { isLoading }] = useUpdateRoomMutation()
  const [uploadPhotoMutation] = useCreatePhotoMutation();

  useEffect(() => {
    form.setFieldsValue({
      name: data?.name,
      capacity: data?.capacity,
      description: data?.description
    });
  }, [data, form]);

  const onFinish = (values: any) => {
    const roomValues = {
      ...values,
      branch: data?.branch.id,
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
          const mutationPromise = updateMutation({ ...roomValues, id: data?.id, photo: res.id }).unwrap();

          toast
            .promise(mutationPromise, {
              loading: `xona ma'lumotlari yangilanmoqda...`,
              success: `muvaffaqqiyatli yangilandi`,
              error: ({ data }) => JSON.stringify(data),
            })
            .then(() => {
              setVisible(false);
            });
        })
    } else {
      const mutationPromise = updateMutation({ id: data?.id, ...roomValues }).unwrap()
      toast
        .promise(mutationPromise, {
          loading: `yangilanmoqda...`,
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
      title="Yangi dars qo'shish"
      visible={visible}
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
    </Modal>
  );
};

export default LessonModal;
