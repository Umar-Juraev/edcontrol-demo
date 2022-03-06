import React, { FC } from "react";
import { Button as AntdButton, ButtonProps } from "antd";
import cn from "classnames";

import "./Button.scss";

export type Props = ButtonProps & {
  fullWidth?: boolean;
  className?: string;
  iconMode?: boolean;
  singleIconMode?: boolean;
  addMode?: boolean;
  filter?: boolean;
  active?: boolean;
};

const Button: FC<Props> = ({
  children,
  className,
  iconMode,
  singleIconMode,
  addMode,
  filter,
  fullWidth,
  active,
  ...props
}) => {
  const classNames = cn(
    className && className,
    iconMode && "ant-icon-mode",
    singleIconMode && "ant-single-icon-mode",
    fullWidth && "full-width",
    addMode && "ant-btn-add",
    filter && "ant-btn-filter",
    active && 'blue-btn'
  );

  return (
    <AntdButton className={classNames} {...props}>
      {children}
    </AntdButton>
  );
};

export default Button;
