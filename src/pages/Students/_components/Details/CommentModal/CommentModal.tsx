import { Modal } from "components/shared";
import React, { FC } from "react";

type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const CommentModal: FC<Props> = ({ visible, setVisible }) => {
  return (
    <Modal
      title="Izohlar"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      umar
    </Modal>
  );
};

export default CommentModal;
