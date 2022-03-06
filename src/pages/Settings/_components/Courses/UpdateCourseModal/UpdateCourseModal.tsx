import React, { FC, useEffect, useState } from "react";
import { Form } from "antd";
import toast from "react-hot-toast";

import { CoursesDTO } from "types";
import { checkObjectValueExist } from "utils";
import { Button, FormElements, Modal } from "components/shared";
import { CourseDurationOptions, GROUP_STEPS, GROUP_TYPE, LessonDurationOptions } from "constants/states";
import { useCreatePhotoMutation, useDirectionsQuery, useUpdateCourseMutation } from "store/endpoints";

type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
  data?: CoursesDTO;
};

const UpdateCourseModal: FC<Props> = ({ visible, setVisible, data }) => {
  const [form] = Form.useForm()
  const [file, setFile] = useState<any>(null);

  const directionsQuery = useDirectionsQuery()

  const [updateMutation, { isLoading }] = useUpdateCourseMutation()
  const [uploadPhotoMutation] = useCreatePhotoMutation();

  useEffect(() => {
    form.setFieldsValue({
      name: data?.name,
      direction: data?.direction.id,
      pay_for_every: GROUP_STEPS[data?.pay_for_every as number]?.name,
      lesson_duration: data?.lesson_duration,
      course_duration: data?.course_duration,
      price: data?.price
    })
  }, [data, form]);

  const onFinish = (values: any) => {
    const updateValues = {
      ...values,
      pay_for_every: isNaN(values.pay_for_every) ? data?.pay_for_every : +values.pay_for_every,
      branches: [data?.branches[0]?.id]
    }

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
          const mutationPromise = updateMutation({ ...updateValues, id: data?.id, photo: res.id }).unwrap();

          toast
            .promise(mutationPromise, {
              loading: `kurs ma'lumotlari yangilanmoqda...`,
              success: `muvaffaqqiyatli yangilandi`,
              error: ({ data }) => JSON.stringify(data),
            })
            .then(() => {
              setVisible(false);
            });
        })
    } else {
      const mutationPromise = updateMutation({ id: data?.id, ...updateValues }).unwrap()
      toast
        .promise(mutationPromise, {
          loading: `kurs ma'lumotlari yangilanmoqda...`,
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
      title="Guruhni o'zgartirish"
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

        <Form.Item name="name" label="Kurs nomi" >
          <FormElements.Input />
        </Form.Item>

        <Form.Item name="direction" label="Kurs yo'nalishi"  >
          <FormElements.Select
            loading={directionsQuery.isFetching}
            options={directionsQuery?.data?.map((item) => (
              { title: item.name, value: item.id }
            ))}
          />
        </Form.Item>

        <Form.Item name="pay_for_every" label="Kurs turi" >
          <FormElements.Select
            options={GROUP_TYPE}
          />
        </Form.Item>

        <Form.Item name="lesson_duration" label="Dars davomiyligi:"  >
          <FormElements.Select
            options={LessonDurationOptions}
          />
        </Form.Item>

        <Form.Item name="course_duration" label="Kurs davomiyligi:"  >
          <FormElements.Select
            options={CourseDurationOptions}
          />
        </Form.Item>

        <Form.Item name="price" label="Kurs narxi:" >
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

export default UpdateCourseModal;
