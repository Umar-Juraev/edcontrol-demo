import React, { FC } from "react";
import { Col, Row, Form } from "antd";

import { Button, FormElements, Modal } from "components/shared";
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

  // const reasonsQuery = useReasonsQuery();
  // const employeesQuery = useEmployeesFullQuery();

  const onCloseModal = () => {
    dispatch(setOpenCostsFilterModal(false));
  };



  return (
    <Modal
      title="Filter qilish"
      visible={costsStates.openFilterModal}
      onCancel={() => onCloseModal()}
    >
      <Form
        form={form}
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
           
          />
        </Form.Item>

        <Form.Item name="employee" label="Xodim:">
          <FormElements.Select
            fullWidth
            showSearch
        
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

export default CostsFilterModal;
