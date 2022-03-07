// import classes from "./FilterModalGroup.module.scss";
import { FC, useState } from "react";
import { Col, Row, Form } from "antd";

import { Button, FilterCarouselCard, FormElements, Modal } from "components/shared";
// import {
//   useGroupsFullQuery,
//   useRegionsQuery,
//   useDistrictsQuery,
// } from "store/endpoints";
// import { DirectionsDTO, TeachersDTO } from "types";
import { useAppDispatch } from "store/hooks";
import { GENDER_TYPE } from "constants/states";
import {
  setStudentFilterDirection,
  setStudentFilterDistrict,
  setStudentFilterGender,
  setStudentFilterGroup,
  setStudentFilterTeacher
} from "store/slices/filters";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
  loading?: boolean;
};

const StudentsFilterModal: FC<Props> = ({ visible, setVisible, loading }) => {
  const [form] = Form.useForm();
  const [regionId, setRegionId] = useState<number>();

  const [selectedDirection, setSelectedDirection] =
    useState<any | null>();
  const [selectedTeacher, setSelectedTeacher] = useState<any | null>();
  const dispatch = useAppDispatch();

  // const groupsQuery = useGroupsFullQuery();
  // const regionsQuery = useRegionsQuery();
  // const districtsQuery = useDistrictsQuery({ region: regionId });

  // const onFinish = (values: any) => {
  //   selectedDirection?.id && dispatch(setStudentFilterDirection(String(selectedDirection?.id)))
  //   selectedTeacher?.id && dispatch(setStudentFilterTeacher(String(selectedTeacher?.id)))
  //   values.group && dispatch(setStudentFilterGroup(String(values.group)))
  //   values.gender && dispatch(setStudentFilterGender(values.gender))
  //   values.district && dispatch(setStudentFilterDistrict(values.district))
  //   setVisible(false);
  // };



  // const onReset = () => {
  //   dispatch(setStudentFilterDirection(null))
  //   dispatch(setStudentFilterTeacher(null))
  //   dispatch(setStudentFilterGroup(null))
  //   dispatch(setStudentFilterGender(null))
  //   dispatch(setStudentFilterDistrict(null))

  //   form.resetFields();
  //   setSelectedDirection(null);
  //   setSelectedTeacher(null);
  //   setVisible(false);
  // };

  return (
    <Modal
      title="Filter qilish"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form
        form={form}
        // onFinish={onFinish}
        // className={classes.form}
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

        <Form.Item name="group" label="Guruhi">
          <FormElements.Select
            showSearch
          // loading={groupsQuery.isFetching}
          // options={groupsQuery.data?.map((item) => ({
          //   title: item.name,
          //   value: item.id,
          //   key: item.id,
          // }))}
          />
        </Form.Item>

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
            onSelect={(e: number) => setRegionId(e)}
          // loading={regionsQuery.isFetching}
          // options={regionsQuery.data?.map((item) => ({
          //   title: item.name,
          //   value: item.id,
          //   key: item.id,
          // }))}
          />
        </Form.Item>
        <Form.Item name="district">
          <FormElements.Select
          // loading={districtsQuery.isFetching}
          // options={districtsQuery.data?.map((item) => ({
          //   title: item.name,
          //   value: item.id,
          //   key: item.id,
          // }))}
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

export default StudentsFilterModal;
