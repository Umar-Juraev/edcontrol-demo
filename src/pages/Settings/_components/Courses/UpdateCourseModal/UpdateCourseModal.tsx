import React, { FC, useEffect, useState } from "react";
import { Form } from "antd";
import toast from "react-hot-toast";

import { checkObjectValueExist } from "utils";
import { Button, FormElements, Modal } from "components/shared";
import { CourseDurationOptions, GROUP_STEPS, GROUP_TYPE, LessonDurationOptions } from "constants/states";

type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const UpdateCourseModal: FC<Props> = ({ visible, setVisible}) => {
  

  return (
    <Modal
      title="Guruhni o'zgartirish"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form

        layout="vertical"
      >
        <Form.Item label="Rasm yuklash">
          <FormElements.Upload dragger  />
        </Form.Item>

        <Form.Item name="name" label="Kurs nomi" >
          <FormElements.Input />
        </Form.Item>

        <Form.Item name="direction" label="Kurs yo'nalishi"  >
          <FormElements.Select
            // loading={directionsQuery.isFetching}
            // options={directionsQuery?.data?.map((item) => (
            //   { title: item.name, value: item.id }
            // ))}
          />
        </Form.Item>

        <Form.Item name="pay_for_every" label="Kurs turi" >
          <FormElements.Select
            options={GROUP_TYPE}
          />
        </Form.Item>

        <Form.Item name="lesson_duration" label="Dars davomiyligi:"  >
          <FormElements.Select
            options={LessonDurationOptions}
          />
        </Form.Item>

        <Form.Item name="course_duration" label="Kurs davomiyligi:"  >
          <FormElements.Select
            options={CourseDurationOptions}
          />
        </Form.Item>

        <Form.Item name="price" label="Kurs narxi:" >
          <FormElements.Input />
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

export default UpdateCourseModal;
