import { FC, useState } from "react";
import { Row, Col, Form } from "antd";
import { GENDER_TYPE } from "constants/states";
import { DirectionsDTO } from "types";
import { Button, FormElements, Modal } from "components/shared";
import FilterCarouselCard from "components/shared/FilterCarouselCard";
import { useAppDispatch } from "store/hooks";
import {
  useRegionsQuery,
  useDistrictsQuery,
} from "store/endpoints";
import {
  setTeacherFilterDirection,
  setTeacherFilterDistrict,
  setTeacherFilterGender,
} from "store/slices/teacherFilter";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
  loading?: boolean;
};

const TeacherFilterModal: FC<Props> = ({ visible, setVisible, loading }) => {
  const [form] = Form.useForm();
  const [regionId, setRegionId] = useState<number>();

  const [selectedDirection, setSelectedDirection] =
    useState<DirectionsDTO | null>();
  const dispatch = useAppDispatch();

  const regionsQuery = useRegionsQuery();
  const districtsQuery = useDistrictsQuery({ region: regionId });

  const onFinish = (values: any) => {
    selectedDirection?.id &&
      dispatch(setTeacherFilterDirection(String(selectedDirection?.id)));
    values.gender && dispatch(setTeacherFilterGender(values.gender));
    values.district && dispatch(setTeacherFilterDistrict(String(values.district)));

    setVisible(false);
  };

  const onReset = () => {
    dispatch(setTeacherFilterDirection(null));
    dispatch(setTeacherFilterGender(null));
    dispatch(setTeacherFilterDistrict(null));

    form.resetFields();
    setSelectedDirection(null);
    setVisible(false);
  };

  return (
    <Modal
      title="Filter qilish"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">

        <FilterCarouselCard
          title="Yo`nalishlar:"
          type="direction"
          selectedDirection={selectedDirection}
          setSelectedDirection={setSelectedDirection}
        />


        <Form.Item name="gender" label="Jinsi">
          <FormElements.Select
            showSearch
            options={GENDER_TYPE.map((item: any) => ({
              title: item.title,
              value: item.value,
              key: item.value,
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

        <Form.Item name="region" label="Viloyat">
          <FormElements.Select
            loading={regionsQuery.isFetching}
            onSelect={(e) => setRegionId(e)}
            options={regionsQuery.data?.map((item) => ({
              title: item.name,
              value: item.id,
              key: item.id,
            }))}
          />
        </Form.Item>

        <Form.Item name="district">
          <FormElements.Select
            loading={districtsQuery.isFetching}
            options={districtsQuery.data?.map((item) => ({
              title: item.name,
              value: item.id,
              key: item.id,
            }))}
          />
        </Form.Item>

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

export default TeacherFilterModal;
