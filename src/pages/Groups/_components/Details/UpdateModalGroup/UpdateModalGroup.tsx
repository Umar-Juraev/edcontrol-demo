import { FC } from "react";
import _ from "lodash";
import { Form } from "antd";
import { Button, FormElements, Modal } from "components/shared";


import classes from "./UpdateModalGroup.module.scss";

type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const UpdateModalGroup: FC<Props> = ({ visible, setVisible }) => {


  return (
    <Modal
      title="Change group"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form

        className={classes.form}
        layout="vertical"
      >
        <Form.Item label="image upload">
          <FormElements.Upload dragger />
        </Form.Item>

        <Form.Item name="name" label="Name:" rules={[{ required: true, message: 'Name is required' }]} >
          <FormElements.Input />
        </Form.Item>

        <Form.Item name="course" label="Course:" rules={[{ required: true, message: 'Course is required' }]} >
          <FormElements.Select
            fullWidth
            showSearch

          />
        </Form.Item>

        <Form.Item name="teacher" label="Teacher:" rules={[{ required: true, message: `Teacher is required` }]} >
          <FormElements.Select
            fullWidth
            showSearch

          />
        </Form.Item>

        <Form.Item name="days" label="Days:" rules={[{ required: true, message: `Days is required` }]} >
          <FormElements.Select
            showSearch
            mode="multiple"

          />
        </Form.Item>

        <Form.Item name="room" label="Room:" rules={[{ required: true, message: 'Room is required' }]}>
          <FormElements.Select
            fullWidth
            showSearch

          />
        </Form.Item>


        <>
          <Form.Item name="salary_for_month" label="Salary:" >
            <FormElements.Input />
          </Form.Item>

          <Form.Item name="percent_for_every_students_pay" label="Payment percentage for each student:"  >
            <FormElements.Input />
          </Form.Item>
        </>


        <Form.Item name="lesson_start_time" label="Class start time:" rules={[{ required: true, message: 'Class start time is required' }]}>
          <FormElements.TimePicker minuteStep={30} />
        </Form.Item>

        <Form.Item name="lessons_start_date" label="Course start date:" rules={[{ required: true, message: 'Course start date is required' }]}>
          <FormElements.DatePicker />
        </Form.Item>

        <Form.Item name="lessons_end_date" label="Date of class completion:" rules={[{ required: true, message: 'Date of class completion is required' }]}>
          <FormElements.DatePicker />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          fullWidth
          size="large"
        >
          Confirm
        </Button>
      </Form>
    </Modal >
  );
};

export default UpdateModalGroup;
