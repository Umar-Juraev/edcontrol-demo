import React, { FC, useEffect, useState } from "react";
import _ from "lodash";
import { Form } from "antd";
import moment from "moment";
import toast from "react-hot-toast";

import { GroupsDTO } from "types";
import { Button, FormElements, Modal } from "components/shared";

import { useAppSelector } from "store/hooks";

import classes from "./UpdateModalGroup.module.scss";

type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
  data?: GroupsDTO;
};

const UpdateModalGroup: FC<Props> = ({ visible, setVisible, data }) => {
  

  return (
    <Modal
      title="Guruhni o'zgartirish"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form

        className={classes.form}
        layout="vertical"
      >
        <Form.Item label="Rasm yuklash">
          <FormElements.Upload dragger  />
        </Form.Item>

        <Form.Item name="name" label="Nomi:" rules={[{ required: true, message: 'nomi majburiy' }]} >
          <FormElements.Input />
        </Form.Item>

        <Form.Item name="course" label="Kurs:" rules={[{ required: true, message: 'kurs majburiy' }]} >
          <FormElements.Select
            fullWidth
            showSearch
          
          />
        </Form.Item>

        <Form.Item name="teacher" label="O'qituvchi:" rules={[{ required: true, message: `o'qituvchi majburiy` }]} >
          <FormElements.Select
            fullWidth
            showSearch

          />
        </Form.Item>

        <Form.Item name="days" label="Kunlari:" rules={[{ required: true, message: `kunlar majburiy` }]} >
          <FormElements.Select
            showSearch
            mode="multiple"

          />
        </Form.Item>

        <Form.Item name="room" label="Xona:" rules={[{ required: true, message: 'xona majburiy' }]}>
          <FormElements.Select
            fullWidth
            showSearch
           
          />
        </Form.Item>


          <>
            <Form.Item name="salary_for_month" label="Narx:" >
              <FormElements.Input />
            </Form.Item>

            <Form.Item name="percent_for_every_students_pay" label="Har bir talaba uchun to'lov foizi:"  >
              <FormElements.Input />
            </Form.Item>
          </>
        

        <Form.Item name="lesson_start_time" label="Dars boshlanish vaqti:" rules={[{ required: true, message: 'boshlanish vaqti majburiy' }]}>
          <FormElements.TimePicker minuteStep={30} />
        </Form.Item>

        <Form.Item name="lessons_start_date" label="Dars boshlanish sanasi:" rules={[{ required: true, message: 'boshlanish sanasi majburiy' }]}>
          <FormElements.DatePicker />
        </Form.Item>

        <Form.Item name="lessons_end_date" label="Dars tugash sanasi:" rules={[{ required: true, message: 'tugash sanasi majburiy' }]}>
          <FormElements.DatePicker />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          fullWidth
          size="large"
        >
          Tasdiqlash
        </Button>
      </Form>
    </Modal >
  );
};

export default UpdateModalGroup;
