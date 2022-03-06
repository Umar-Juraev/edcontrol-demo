import React, { FC, useState } from "react";
import { Form } from "antd";
import toast from "react-hot-toast";

import { checkObjectValueExist } from "utils";
import { useAppSelector } from "store/hooks";
import { Modal, FormElements, Button } from "components/shared";
import { CourseDurationOptions, GROUP_TYPE, LessonDurationOptions } from "constants/states";
import { useDirectionsQuery, useCreateCourseMutation, useCreatePhotoMutation } from "store/endpoints";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const CreateCourseModal: FC<Props> = ({ visible, setVisible }) => {
  const [form] = Form.useForm()
  const { currentUser } = useAppSelector(state => state.persistedData)
  const [file, setFile] = useState<any>(null);

  const directionsQuery = useDirectionsQuery()

  const [createMutation, { isLoading }] = useCreateCourseMutation()
  const [uploadPhotoMutation] = useCreatePhotoMutation();

  const onFinish = (values: any) => {
    const courseValues = {
      ...values,
      branches: [currentUser.data?.branch?.id || 1]
    }
    checkObjectValueExist(courseValues)

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
          const mutationPromise = createMutation({ ...courseValues, photo: res.id }).unwrap();
          toast
            .promise(mutationPromise, {
              loading: `kurs yaratilmoqda...`,
              success: `muvaffaqqiyatli yaratildi`,
              error: ({ data }) => JSON.stringify(data),
            })
            .then(() => {
              setVisible(false);
              form.resetFields()
            });
        })
    } else {
      const mutationPromise = createMutation(courseValues).unwrap();
      toast
        .promise(mutationPromise, {
          loading: `kurs yaratilmoqda...`,
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
      title="Yangi kurs qo'shish"
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

        <Form.Item name="name" label="Kurs nomi" rules={[{ required: true }]}>
          <FormElements.Input />
        </Form.Item>

        <Form.Item name="direction" label="Kurs yo'nalishi" rules={[{ required: true }]} >
          <FormElements.Select
            loading={directionsQuery.isFetching}
            options={directionsQuery.data?.map((item) => (
              { title: item.name, value: item.id }
            ))}
          />
        </Form.Item>

        <Form.Item name="pay_for_every" label="Kurs turi" >
          <FormElements.Select
            options={GROUP_TYPE}
          />
        </Form.Item>
        <Form.Item name="lesson_duration" label="Dars davomiyligi:" rules={[{ required: true }]} >
          <FormElements.Select
            options={LessonDurationOptions}
          />
        </Form.Item>

        <Form.Item name="course_duration" label="Kurs davomiyligi:" rules={[{ required: true }]} >
          <FormElements.Select
            options={CourseDurationOptions}
          />
        </Form.Item>

        <Form.Item name="price" label="Kurs narxi:" rules={[{ required: true }]}>
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

export default CreateCourseModal;
