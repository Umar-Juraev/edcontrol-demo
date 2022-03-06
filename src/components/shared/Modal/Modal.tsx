import React, { FC } from "react";
import {  Modal as AntdModal, ModalProps,  } from "antd";



import "./Modal.scss";

export type buttonProps = {
  title: string;
  onClick: React.MouseEventHandler<HTMLElement>;
};

type Props = ModalProps & {
  width?: number;
};


const Modal: FC<Props> = ({
  width = 600,
  children,
  ...props
}) => {

  return (
    <AntdModal width={width} footer={null} {...props}>
      {children}
    </AntdModal>
  );
};

export default Modal;
