import Form from "antd/lib/form/Form";
import { Button, FormElements, Modal } from "components/shared";
import React, { FC } from "react";

type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const NewMessageModal: FC<Props> = ({ visible, setVisible }) => {
  return (
    <Modal
      title="Yangi xabar"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form>
        <FormElements.TextArea
          placeholder="Yangi xabar yozing"
          autoSize={{ minRows: 10, maxRows: 15 }}
        />
        <Button
          style={{ margin: "20px 0 0 0" }}
          fullWidth
          type="primary"
          htmlType="submit"
          size="large"
          // loading={isLoading}
          // disabled={isLoading}
        >
          Tasdiqlash
        </Button>
      </Form>
    </Modal>
  );
};

export default NewMessageModal;
