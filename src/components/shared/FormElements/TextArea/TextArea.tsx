import React, { FC } from "react";
import { Input, } from "antd";
import "./TextArea.scss";

export type Props = {
  className?: string;
  placeholder?: string;
  rows?: number;
  value?: string;
  autoSize?: any;
  maxLength?: number;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
};

const TextArea: FC<Props> = ({ rows = 5, maxLength, ...props }) => {

  return (
    <Input.TextArea
      rows={rows}
      maxLength={maxLength}
      {...props}
    />
  );
};

export default TextArea;
