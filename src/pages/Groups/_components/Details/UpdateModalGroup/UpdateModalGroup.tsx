import React, { FC, useEffect, useState } from "react";
import _ from "lodash";
import { Form } from "antd";
import moment from "moment";
import toast from "react-hot-toast";

import { GroupsDTO } from "types";
import { Button, FormElements, Modal } from "components/shared";
import {
  useWeekdaysQuery,
  useUpdateGroupMutation,
  useCoursesFullQuery,
  useRoomsFullQuery,
  useTeachersFullQuery,
  useCreatePhotoMutation
} from "store/endpoints";
import { useAppSelector } from "store/hooks";

import classes from "./UpdateModalGroup.module.scss";

type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
  data?: GroupsDTO;
};

const UpdateModalGroup: FC<Props> = ({ visible, setVisible, data }) => {
  const [form] = Form.useForm()
  const [file, setFile] = useState<any>(null);

  const { currentUser } = useAppSelector((state) => state.persistedData);
  const SUPER_USER = currentUser.data?.role == 1000;
  const CEO = currentUser.data?.role == 999;

  const coursesQuery = useCoursesFullQuery();
  const roomsQuery = useRoomsFullQuery();
  const weekDaysQuery = useWeekdaysQuery()
  const teachersQuery = useTeachersFullQuery();

  const [updateMutation, { isLoading }] = useUpdateGroupMutation()
  const [uploadPhotoMutation] = useCreatePhotoMutation();

  useEffect(() => {
    form.setFieldsValue({
      name: data?.name,
      course: data?.course.id,
      teacher: data?.teacher.id,
      days: data?.days.map((item) => item.id),
      room: data?.room.id,
      salary_for_month: data?.salary_for_month,
      percent_for_every_students_pay: data?.percent_for_every_students_pay,
      lesson_start_time: moment(data?.lesson_start_time, 'HH:mm'),
      lessons_start_date: moment(data?.lessons_start_date),
      lessons_end_date: moment(data?.lessons_end_date),
    })
  }, [data, form]);

  const onFinish = (values: any) => {

    const updateValues = {
      ...values,
      percent_for_every_students_pay: Number(values.percent_for_every_students_pay),
      salary_for_month: Number(values.salary_for_month),
      lesson_start_time: moment(values.lesson_start_time).format('HH:mm'),
      lessons_start_date: moment(values.lessons_start_date).format('YYYY-MM-DD'),
      lessons_end_date: moment(values.lessons_end_date).format('YYYY-MM-DD'),
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
              loading: `guruh ma'lumotlari yangilanmoqda...`,
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
      title="Guruhni o'zgartirish"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form
        form={form}
        onFinish={onFinish}
        className={classes.form}
        layout="vertical"
      >
        <Form.Item label="Rasm yuklash">
          <FormElements.Upload dragger onChange={onChangeUpload} />
        </Form.Item>

        <Form.Item name="name" label="Nomi:" rules={[{ required: true, message: 'nomi majburiy' }]} >
          <FormElements.Input />
        </Form.Item>

        <Form.Item name="course" label="Kurs:" rules={[{ required: true, message: 'kurs majburiy' }]} >
          <FormElements.Select
            fullWidth
            showSearch
            options={coursesQuery.data?.map((item) => ({
              title: item.name,
              value: item.id,
              key: item.id,
            }))}
          />
        </Form.Item>

        <Form.Item name="teacher" label="O'qituvchi:" rules={[{ required: true, message: `o'qituvchi majburiy` }]} >
          <FormElements.Select
            fullWidth
            showSearch
            options={teachersQuery.data?.map((item) => ({
              title: item.full_name,
              value: item.id,
              key: item.id,
            }))}
          />
        </Form.Item>

        <Form.Item name="days" label="Kunlari:" rules={[{ required: true, message: `kunlar majburiy` }]} >
          <FormElements.Select
            showSearch
            mode="multiple"
            loading={weekDaysQuery.isFetching}
            options={_.sortBy(weekDaysQuery.data, (item) => item.id)?.map((item) => ({
              title: item.name,
              value: item.id,
              key: item.id,
            }))}
          />
        </Form.Item>

        <Form.Item name="room" label="Xona:" rules={[{ required: true, message: 'xona majburiy' }]}>
          <FormElements.Select
            fullWidth
            showSearch
            options={roomsQuery.data?.map((item) => ({
              title: item.name,
              value: item.id,
              key: item.id,
            }))}
          />
        </Form.Item>

        {(CEO || SUPER_USER) && (
          <>
            <Form.Item name="salary_for_month" label="Narx:" >
              <FormElements.Input />
            </Form.Item>

            <Form.Item name="percent_for_every_students_pay" label="Har bir talaba uchun to'lov foizi:"  >
              <FormElements.Input />
            </Form.Item>
          </>
        )}

        <Form.Item name="lesson_start_time" label="Dars boshlanish vaqti:" rules={[{ required: true, message: 'boshlanish vaqti majburiy' }]}>
          <FormElements.TimePicker minuteStep={30} />
        </Form.Item>

        <Form.Item name="lessons_start_date" label="Dars boshlanish sanasi:" rules={[{ required: true, message: 'boshlanish sanasi majburiy' }]}>
          <FormElements.DatePicker />
        </Form.Item>

        <Form.Item name="lessons_end_date" label="Dars tugash sanasi:" rules={[{ required: true, message: 'tugash sanasi majburiy' }]}>
          <FormElements.DatePicker />
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

export default UpdateModalGroup;
