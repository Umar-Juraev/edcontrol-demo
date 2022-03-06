import React, { FC, useEffect } from "react";
import { Col, Form, Row } from "antd";

import { Modal, FormElements, Button } from "components/shared";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setOpenCalculator, setSalaryDates } from "store/slices/finances";
import moment from "moment";

export type Props = {};

const CalculatorModal: FC<Props> = () => {
  const [form] = Form.useForm();

  const { salaryStates } = useAppSelector((state) => state.finances);
  const dispatch = useAppDispatch();

  useEffect(() => {
    form.setFieldsValue({
      startDate: moment(salaryStates.startDate),
      endDate: moment(salaryStates.endDate),
    });
  }, [salaryStates]);

  const onCloseModal = () => {
    dispatch(setOpenCalculator(false));
  };

  const onFinish = (values: any) => {
    dispatch(
      setSalaryDates({ startDate: values.startDate, endDate: values.endDate })
    );
    onCloseModal();
  };

  const onReset = () => {
    form.resetFields();
    dispatch(
      setSalaryDates({
        startDate: moment().subtract(1, "year").format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
      })
    );
    onCloseModal();
  };

  return (
    <Modal
      title="Kalkulyator"
      visible={salaryStates.openCalculator}
      onCancel={() => onCloseModal()}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row align="bottom" gutter={8}>
          <Col span={12}>
            <Form.Item name="startDate" label="Davomiyligi:">
              <FormElements.DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="endDate">
              <FormElements.DatePicker />
            </Form.Item>
          </Col>
        </Row>

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
            >
              Saqlash
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CalculatorModal;
