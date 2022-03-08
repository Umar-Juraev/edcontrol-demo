import  { FC} from "react";
import { Form } from "antd";

import { Button, FormElements, Modal } from "components/shared";
import { CourseDurationOptions, GROUP_TYPE, LessonDurationOptions } from "constants/states";

type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const UpdateCourseModal: FC<Props> = ({ visible, setVisible}) => {
  

  return (
    <Modal
      title="Change group"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form

        layout="vertical"
      >
        <Form.Item label="upload image">
          <FormElements.Upload dragger  />
        </Form.Item>

        <Form.Item name="name" label="Name" >
          <FormElements.Input />
        </Form.Item>

        <Form.Item name="direction" label="direction"  >
          <FormElements.Select
          />
        </Form.Item>

        <Form.Item name="pay_for_every" label="Type" >
          <FormElements.Select
            options={GROUP_TYPE}
          />
        </Form.Item>

        <Form.Item name="lesson_duration" label="Lesson duration:"  >
          <FormElements.Select
            options={LessonDurationOptions}
          />
        </Form.Item>

        <Form.Item name="course_duration" label=" Course duration:"  >
          <FormElements.Select
            options={CourseDurationOptions}
          />
        </Form.Item>

        <Form.Item name="price" label="Price:" >
          <FormElements.Input />
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

export default UpdateCourseModal;
