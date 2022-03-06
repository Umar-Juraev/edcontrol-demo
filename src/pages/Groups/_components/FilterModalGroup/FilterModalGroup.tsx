import classes from "./FilterModalGroup.module.scss";
import { FC, useState } from "react";
import { Col, Row, Form } from "antd";

import {
  Button,
  FilterCarouselCard,
  FormElements,
  Modal,
} from "components/shared";
import { useWeekdaysQuery, useRoomsFullQuery } from "store/endpoints";
import { DirectionsDTO, TeachersDTO } from "types";
import { useAppDispatch } from "store/hooks";
import {
  setGroupFilterDays,
  setGroupFilterDirection,
  setGroupFilterLessonEndDate,
  setGroupFilterLessonStartDate,
  setGroupFilterRoom,
  setGroupFilterTeacher
} from "store/slices/filters";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
  loading?: boolean;
};

const FilterModalGroup: FC<Props> = ({ visible, setVisible, loading }) => {
  const [form] = Form.useForm();

  const [selectedDirection, setSelectedDirection] =
    useState<DirectionsDTO | null>();
  const [selectedTeacher, setSelectedTeacher] = useState<TeachersDTO | null>();
  const dispatch = useAppDispatch();

  const weekDaysQuery = useWeekdaysQuery();
  const roomsQuery = useRoomsFullQuery();

  const onFinish = (values: any) => {

    selectedDirection?.id && dispatch(setGroupFilterDirection(selectedDirection?.id))
    selectedTeacher?.id && dispatch(setGroupFilterTeacher(selectedTeacher?.id))
    values.days && dispatch(setGroupFilterDays(values.days))
    values.rooms && dispatch(setGroupFilterRoom(values.rooms))
    values.lessons_start_date && dispatch(setGroupFilterLessonStartDate(values.lessons_start_date))
    values.lessons_end_date && dispatch(setGroupFilterLessonEndDate(values.lessons_end_date))
    setVisible(false);
  };

  const onReset = () => {
    dispatch(setGroupFilterDirection(null))
    dispatch(setGroupFilterTeacher(null))
    dispatch(setGroupFilterDays(null))
    dispatch(setGroupFilterRoom(null))
    dispatch(setGroupFilterLessonStartDate(null))
    dispatch(setGroupFilterLessonEndDate(null))

    form.resetFields();
    setSelectedDirection(null);
    setSelectedTeacher(null);
    setVisible(false);
  };
  
  return (
    <Modal
      title="Filter qilish"
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
        <FilterCarouselCard
          title="Yo`nalishlar:"
          type="direction"
          selectedDirection={selectedDirection}
          setSelectedDirection={setSelectedDirection}
          setSelectedTeacher={setSelectedTeacher}
        />
        <FilterCarouselCard
          title="O`qituvchilar:"
          type="teacher"
          selectedTeacher={selectedTeacher}
          setSelectedDirection={setSelectedDirection}
          setSelectedTeacher={setSelectedTeacher}
        />

        <Form.Item name="days" label="Kunlar:">
          <FormElements.Select
            fullWidth
            loading={weekDaysQuery.isFetching}
            options={weekDaysQuery.data?.map((days) => ({
              key: days?.id,
              title: days?.name,
              value: days?.id,
            }))}
          />
        </Form.Item>

        <Form.Item name="rooms" label="Xonalar:">
          <FormElements.Select
            fullWidth
            loading={roomsQuery.isFetching}
            options={roomsQuery.data?.map((room) => ({
              key: room?.id,
              title: room?.name,
              value: room?.id,
            }))}
          />
        </Form.Item>

        {/* <Row align="bottom" gutter={8}>
          <Col span={12}>
            <Form.Item name="lessons_start_date" label="Davomiyligi:">
              <FormElements.DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="lessons_end_date">
              <FormElements.DatePicker />
            </Form.Item>
          </Col>
        </Row> */}

        <Row gutter={8}>
          <Col span={12}>
            <Button danger fullWidth size="large" onClick={() => onReset()}>
              Qaytarish
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              htmlType="submit"
              fullWidth
              size="large"
              loading={loading}
              disabled={loading}
            >
              Saqlash
            </Button>
          </Col>
        </Row>

      </Form>
    </Modal>
  );
};

export default FilterModalGroup;
