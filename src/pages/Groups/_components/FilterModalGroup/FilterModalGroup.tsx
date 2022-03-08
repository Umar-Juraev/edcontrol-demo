import classes from "./FilterModalGroup.module.scss";
import { FC, useState } from "react";
import { Col, Row, Form } from "antd";

import {
  Button,
  FilterCarouselCard,
  FormElements,
  Modal,
} from "components/shared";

import { useAppDispatch } from "store/hooks";
import {
  setGroupFilterDays,
  setGroupFilterDirection,
  setGroupFilterLessonEndDate,
  setGroupFilterLessonStartDate,
  setGroupFilterRoom,
  setGroupFilterTeacher
} from "store/slices/filters";
import { DirectionsDTO, TeachersDTO } from "types";

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

  return (
    <Modal
      title="Filter qilish"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form
        form={form}
   
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
          
          />
        </Form.Item>

        <Form.Item name="rooms" label="Xonalar:">
          <FormElements.Select
            fullWidth
         
          />
        </Form.Item>
        <Row gutter={8}>
          <Col span={12}>
            <Button danger fullWidth size="large" >
              Qaytarish
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              htmlType="submit"
              fullWidth
              size="large"
            
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
