import { FC, useState } from "react";
import moment from "moment";
import _ from "lodash";
import toast from "react-hot-toast";
import { Form, Row, Col } from "antd";

import { checkObjectValueExist } from "utils";
import { Button, FormElements, Modal } from "components/shared";
import {
  useWeekdaysQuery,
  useCreateGroupMutation,
  useCoursesFullQuery,
  useRoomsFullQuery,
  useTeachersFullQuery,
  useCreatePhotoMutation,
} from "store/endpoints";
import { AddIcon } from "components/svg";
import { MinusCircleOutlined } from "@ant-design/icons";

import classes from "./CreateModalGroup.module.scss";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const CreateModalGroup: FC<Props> = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const [addMonthCost, setAddMonthCost] = useState(false);
  const [addPercent, setAddPercent] = useState(false);
  const [file, setFile] = useState<any>(null);

  const coursesQuery = useCoursesFullQuery();
  const roomsQuery = useRoomsFullQuery();
  const weekDaysQuery = useWeekdaysQuery();
  const teachersQuery = useTeachersFullQuery();

  const [createMutation, { isLoading }] = useCreateGroupMutation();
  const [uploadPhotoMutation] = useCreatePhotoMutation();

  const onFinish = (values: any) => {
    const groupValues = {
      ...values,
      percent_for_every_students_pay: values.percent_for_every_students_pay
        ? Number(values.percent_for_every_students_pay)
        : 50,
      salary_for_month: Number(values.salary_for_month),
      lesson_start_time: moment(values.lesson_start_time).format("HH:mm"),
      lessons_start_date: moment(values.lessons_start_date).format(
        "YYYY-MM-DD"
      ),
      lessons_end_date: moment(values.lessons_end_date).format("YYYY-MM-DD"),
    };
    checkObjectValueExist(groupValues);

    if (file) {
      const formData = new FormData();
      formData.append("file", file.originFileObj);
      const photoMutationPromise = uploadPhotoMutation(formData).unwrap();

      toast
        .promise(photoMutationPromise, {
          loading: `rasm yuklanmoqda...`,
          success: `muvaffaqqiyatli yuklandi`,
          error: ({ data }) => JSON.stringify(data),
        })
        .then((res: any) => {
          const mutationPromise = createMutation({
            ...groupValues,
            photo: res.id,
          }).unwrap();
          toast
            .promise(mutationPromise, {
              loading: `guruh yaratilmoqda...`,
              success: `muvaffaqqiyatli yaratildi`,
              error: ({ data }) => JSON.stringify(data),
            })
            .then(() => {
              setVisible(false);
              form.resetFields();
            });
        });
    } else {
      const mutationPromise = createMutation(groupValues).unwrap();
      toast
        .promise(mutationPromise, {
          loading: `guruh yaratilmoqda...`,
          success: `muvaffaqqiyatli yaratildi`,
          error: ({ data }) => JSON.stringify(data),
        })
        .then((res) => {
          setVisible(false);
          form.resetFields();
        });
    }
  };

  function onChangeUpload(e?: any): void {
    if (e.file.status === "done") {
      setFile(e.file);
    } else if (e.file.status === "removed") {
      setFile(null);
    }
  }

  return (
    <Modal
      title="Yangi guruh"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form
        onFinish={onFinish}
        className={classes.form}
        layout="vertical"
        form={form}
      >
        <Form.Item label="Rasm yuklash">
          <FormElements.Upload dragger onChange={onChangeUpload} />
        </Form.Item>

        <Form.Item
          name="name"
          label="Nomi:"
          rules={[{ required: true, message: "nomi majburiy" }]}
        >
          <FormElements.Input />
        </Form.Item>

        <Form.Item
          name="course"
          label="Kurs:"
          rules={[{ required: true, message: "kurs majburiy" }]}
        >
          <FormElements.Select
            showSearch
            loading={coursesQuery.isFetching}
            options={coursesQuery.data?.map((item) => ({
              title: item.name,
              value: item.id,
              key: item.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="teacher"
          label="O'qituvchi:"
          rules={[{ required: true, message: `o'qituvchi majburiy` }]}
        >
          <FormElements.Select
            showSearch
            loading={teachersQuery.isFetching}
            options={teachersQuery.data?.map((item) => ({
              title: item.full_name,
              value: item.id,
              key: item.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="days"
          label="Kunlari:"
          rules={[{ required: true, message: `kunlar majburiy` }]}
        >
          <FormElements.Select
            showSearch
            mode="multiple"
            loading={weekDaysQuery.isFetching}
            options={_.sortBy(weekDaysQuery.data, (item) => item.id)?.map(
              (item) => ({
                title: item.name,
                value: item.id,
                key: item.id,
              })
            )}
          />
        </Form.Item>

        <Form.Item
          name="room"
          label="Xona:"
          rules={[{ required: true, message: "xona majburiy" }]}
        >
          <FormElements.Select
            showSearch
            loading={roomsQuery.isFetching}
            options={roomsQuery.data?.map((item) => ({
              title: item.name,
              value: item.id,
              key: item.id,
            }))}
          />
        </Form.Item>

        {addMonthCost ? (
          <Row align="middle" gutter={10}>
            <Col span={23}>
              <Form.Item name="salary_for_month" label="Oylik narx:">
                <FormElements.Input />
              </Form.Item>
            </Col>
            <Col span={1}>
              <MinusCircleOutlined onClick={() => setAddMonthCost(false)} />
            </Col>
          </Row>
        ) : (
          <Button
            addMode
            fullWidth
            size="large"
            icon={<AddIcon />}
            onClick={() => setAddMonthCost(true)}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            Oylik narx qo'shish
          </Button>
        )}

        {addPercent ? (
          <Row align="middle" gutter={10}>
            <Col span={23}>
              <Form.Item
                name="percent_for_every_students_pay"
                label="Har bir talaba uchun to'lov foizi:"
              >
                <FormElements.Input />
              </Form.Item>
            </Col>
            <Col span={1}>
              <MinusCircleOutlined onClick={() => setAddPercent(false)} />
            </Col>
          </Row>
        ) : (
          <Button
            addMode
            fullWidth
            size="large"
            icon={<AddIcon />}
            onClick={() => setAddPercent(true)}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            To'lov foizini qo'shish
          </Button>
        )}

        <Form.Item
          name="lesson_start_time"
          label="Dars boshlanish vaqti:"
          rules={[{ required: true, message: "boshlanish vaqti majburiy" }]}
        >
          <FormElements.TimePicker minuteStep={30} />
        </Form.Item>

        <Form.Item
          name="lessons_start_date"
          label="Dars boshlanish sanasi:"
          rules={[{ required: true, message: "boshlanish sanasi majburiy" }]}
        >
          <FormElements.DatePicker />
        </Form.Item>

        <Form.Item
          name="lessons_end_date"
          label="Dars tugash sanasi:"
          rules={[{ required: true, message: "tugash sanasi majburiy" }]}
        >
          <FormElements.DatePicker  />
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

export default CreateModalGroup;
