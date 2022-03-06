import React, { FC } from "react";
import { Col, Row, Form } from "antd";

import { Button, FormElements, Modal } from "components/shared";
import { useReasonsQuery, useEmployeesFullQuery } from "store/endpoints";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  setOpenCostsFilterModal,
  setCostsFilterEndDate,
  setCostsFilterStartDate,
  setCostsFilterReason,
  setConstsFilterEmployee,
} from "store/slices/finances";

import classes from "./CostsFilterModal.module.scss";
import moment from "moment";

export type Props = {};

const CostsFilterModal: FC<Props> = () => {
  const [form] = Form.useForm();

  const { costsStates } = useAppSelector((state) => state.finances);
  const dispatch = useAppDispatch();

  const reasonsQuery = useReasonsQuery();
  const employeesQuery = useEmployeesFullQuery();

  const onCloseModal = () => {
    dispatch(setOpenCostsFilterModal(false));
  };

  const onFinish = (values: any) => {
    values.start_date &&
      dispatch(
        setCostsFilterStartDate(moment(values.start_date).format("YYYY-MM-DD"))
      );
    values.end_date &&
      dispatch(
        setCostsFilterEndDate(moment(values.end_date).format("YYYY-MM-DD"))
      );
    values.reason && dispatch(setCostsFilterReason(values.reason));
    values.employee && dispatch(setConstsFilterEmployee(values.employee));
    onCloseModal();
  };

  const onReset = () => {
    dispatch(setCostsFilterStartDate(""));
    dispatch(setCostsFilterEndDate(""));
    dispatch(setCostsFilterReason(null));
    dispatch(setConstsFilterEmployee(null));
    form.resetFields();
    onCloseModal();
  };

  return (
    <Modal
      title="Filter qilish"
      visible={costsStates.openFilterModal}
      onCancel={() => onCloseModal()}
    >
      <Form
        form={form}
        onFinish={onFinish}
        className={classes.form}
        layout="vertical"
      >
        <Row align="bottom" gutter={8}>
          <Col span={12}>
            <Form.Item name="start_date" label="Sana:">
              <FormElements.DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="end_date">
              <FormElements.DatePicker />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="reason" label="Sababi:">
          <FormElements.Select
            fullWidth
            showSearch
            loading={reasonsQuery.isFetching}
            options={reasonsQuery.data?.map((item) => ({
              key: item?.id,
              title: item.name,
              value: item?.id,
            }))}
          />
        </Form.Item>

        <Form.Item name="employee" label="Xodim:">
          <FormElements.Select
            fullWidth
            showSearch
            loading={employeesQuery.isFetching}
            options={employeesQuery.data?.map((item) => ({
              key: item?.id,
              title: item.full_name,
              value: item?.id,
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
              loading={reasonsQuery.isLoading || employeesQuery.isLoading}
              disabled={reasonsQuery.isLoading || employeesQuery.isLoading}
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

export default CostsFilterModal;
