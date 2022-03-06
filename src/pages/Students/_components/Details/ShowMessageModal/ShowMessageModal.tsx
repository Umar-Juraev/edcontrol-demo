import {  Modal } from "components/shared";
import  { FC } from "react";

type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const ShowMessageModal: FC<Props> = ({ visible, setVisible }) => {
  return (
    <Modal
      title="Yangi xabar"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      message
    </Modal>
  );
};

export default ShowMessageModal;
