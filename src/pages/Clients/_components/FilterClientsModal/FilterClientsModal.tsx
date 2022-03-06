import { FC, useState } from "react";
import {
  Modal,
  Button,
  FormElements,
  FilterUsersCarousel,
} from "components/shared";
import { Col, Row, Form } from "antd";
import { useAppDispatch } from "store/hooks";
import { DirectionsDTO, UsersDTO } from "types";
import { useSourcesQuery, useStatusesQuery } from "store/endpoints";
import {
  setClientFilterDirection,
  setClientFilterSource,
  setClientFilterDateAddEnd,
  setClientFilterDateAddStart,
  setClientFilterStatus,
} from "store/slices/clientFilters";
import moment from "moment";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
  loading?: boolean;
};

const FilterClientsModal: FC<Props> = ({ visible, setVisible, loading }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [selectedDirection, setSelectedDirection] =
    useState<DirectionsDTO | null>();
  const [selectedClient, setSelectedClient] = useState<UsersDTO | null>();

  const courseQuery = useSourcesQuery();
  const statusQuery = useStatusesQuery();

  const onFinish = (values: any) => {
    dispatch(setClientFilterDirection(selectedDirection?.id));
    dispatch(setClientFilterSource(values.source));
    values.date_add_start &&
      dispatch(
        setClientFilterDateAddStart(
          moment(values.date_add_start).format("YYYY-MM-DD")
        )
      );
    values.date_add_end &&
      dispatch(
        setClientFilterDateAddEnd(
          moment(values.date_add_end).format("YYYY-MM-DD")
        )
      );
    dispatch(setClientFilterStatus(values.status));
    setVisible(false);
  };
  const onReset = () => {
    dispatch(setClientFilterDirection(""));
    dispatch(setClientFilterSource(""));
    dispatch(setClientFilterDateAddStart(null));
    dispatch(setClientFilterDateAddEnd(null));
    dispatch(setClientFilterStatus(""));
    form.resetFields();
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
        <FilterUsersCarousel
          title="Yo`nalishlar:"
          type="direction"
          selectedDirection={selectedDirection}
          setSelectedDirection={setSelectedDirection}
          setSelectedStudent={setSelectedClient}
        />
        <br />
        <Form.Item name="source" label="Manba">
          <FormElements.Select
            showSearch
            loading={courseQuery.isFetching}
            options={courseQuery.data?.map((item) => ({
              title: item.name,
              value: item.id,
              key: item.id,
            }))}
          />
        </Form.Item>

        {/* <Row align="bottom" gutter={8}>
          <Col span={12}>
            <Form.Item name="date_add_start" label="Davomiyligi:">
              <FormElements.DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="date_add_end">
              <FormElements.DatePicker />
            </Form.Item>
          </Col>
        </Row> */}

        <Form.Item name="status" label="Holat">
          <FormElements.Select
            showSearch
            loading={statusQuery.isFetching}
            options={statusQuery.data?.map((item) => ({
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

export default FilterClientsModal;
