import  { FC } from "react";
import { Form } from "antd";
import { Modal, FormElements, Button } from "components/shared";
import { CourseDurationOptions, GROUP_TYPE, LessonDurationOptions } from "constants/states";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const CreateCourseModal: FC<Props> = ({ visible, setVisible }) => {
 

  return (
    <Modal
      title="Yangi kurs qo'shish"
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <Form
        name="basic"
        layout="vertical"
      >
        <Form.Item label="Rasm yuklash">
          <FormElements.Upload dragger  />
        </Form.Item>

        <Form.Item name="name" label="Kurs nomi" rules={[{ required: true }]}>
          <FormElements.Input />
        </Form.Item>

        <Form.Item name="direction" label="Kurs yo'nalishi" rules={[{ required: true }]} >
          <FormElements.Select
          
          />
        </Form.Item>

        <Form.Item name="pay_for_every" label="Kurs turi" >
          <FormElements.Select
            options={GROUP_TYPE}
          />
        </Form.Item>
        <Form.Item name="lesson_duration" label="Dars davomiyligi:" rules={[{ required: true }]} >
          <FormElements.Select
            options={LessonDurationOptions}
          />
        </Form.Item>

        <Form.Item name="course_duration" label="Kurs davomiyligi:" rules={[{ required: true }]} >
          <FormElements.Select
            options={CourseDurationOptions}
          />
        </Form.Item>

        <Form.Item name="price" label="Kurs narxi:" rules={[{ required: true }]}>
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
    </Modal>
  );
};

export default CreateCourseModal;
