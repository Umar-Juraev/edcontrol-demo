import React, { FC, ReactNode } from "react";
import {
  Popconfirm as PopconfirmAntd,
  PopconfirmProps as PopconfirmPropsAntd,
} from "antd";
import "./antd.css";
import classes from "./PopConfirm.module.scss";

export type PopconfirmProps = PopconfirmPropsAntd & {
  children?: ReactNode | any;
  title?: ReactNode | any;
  placement?: string;
};

const PopConfirm: FC<PopconfirmProps> = ({
  children,
  title,
  placement,
  ...props
}) => {
  return (
    <PopconfirmAntd placement={placement} title={title} {...props}>
      <div>{children}</div>
    </PopconfirmAntd>
  );
};

export default PopConfirm;
