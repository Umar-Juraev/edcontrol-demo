import React, { FC, useState } from "react";
import { Col, Row, Form } from "antd";

import {
  Button,
  FilterCarouselCard,
  FormElements,
  Modal,
} from "components/shared";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  setOpenPaymentFilterModal,
  setPaymentFilterDirection,
  setPaymentFilterGender,
  setPaymentFilterProvider,
} from "store/slices/finances";
import { GENDER_TYPE } from "constants/states";

import classes from "./PaymentsFilterModal.module.scss";

export type Props = {};

const PaymentsFilterModal: FC<Props> = () => {
  const [form] = Form.useForm();

  const { paymentStates } = useAppSelector((state) => state.finances);
  const dispatch = useAppDispatch();

  const [selectedDirection, setSelectedDirection] =
    useState<any | null>();
  const [selectedTeacher, setSelectedTeacher] = useState<any | null>();


  const onCloseModal = () => {
    dispatch(setOpenPaymentFilterModal(false));
  };

  const onFinish = (values: any) => {
    dispatch(setPaymentFilterProvider(values.provider));
    dispatch(setPaymentFilterDirection(selectedDirection?.id));
    dispatch(setPaymentFilterGender(values.gender));
    onCloseModal();
  };

  const onReset = () => {
    dispatch(setPaymentFilterProvider(null));
    dispatch(setPaymentFilterDirection(null));
    dispatch(setPaymentFilterGender(null));
    form.resetFields();
    setSelectedDirection(null);
    setSelectedTeacher(null);
    onCloseModal();
  };

  return (
    <Modal
      title="Filter qilish"
      visible={paymentStates.openFilterModal}
      onCancel={() => onCloseModal()}
    >
      <Form
        form={form}
        onFinish={onFinish}
        className={classes.form}
        layout="vertical"
      >
        <Form.Item name="provider" label="To'lov turi:">
          <FormElements.Select
            fullWidth
           
          />
        </Form.Item>

        <FilterCarouselCard
          title="Yo`nalishlar:"
          type="direction"
          selectedDirection={selectedDirection}
          setSelectedDirection={setSelectedDirection}
          setSelectedTeacher={setSelectedTeacher}
        />

        {/* <Form.Item name="groups" label="Guruh:">
          <FormElements.Select
            fullWidth
            showSearch
            loading={groupsQuery.isFetching}
            options={groupsQuery.data?.map((item) => ({
              id: item?.id,
              title: item.name,
              value: item?.id,
            }))}
          />
        </Form.Item> */}

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

export default PaymentsFilterModal;
