import React, { ReactNode } from "react";
import { Tooltip as AntdTooltip, TooltipProps } from "antd";
import "./Tooltip.scss";

export type Props = TooltipProps & {
  children?: ReactNode;
};

const Tooltip = ({ children, placement = "bottom", ...props }: Props) => {
  return (
    <AntdTooltip  {...props} placement={placement}>
      <div className="tooltipText">{children}</div>
    </AntdTooltip>
  );
};

export default Tooltip;
