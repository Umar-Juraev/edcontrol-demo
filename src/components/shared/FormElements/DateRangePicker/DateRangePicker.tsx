import React, { FC } from "react";

import { DatePicker as AntDatePicker, } from "antd";

import "./DateRangePicker.scss";

export type Props = {
  fullWidth?: boolean;
};

const TimePicker: FC<Props> = ({ fullWidth, ...props }) => {
  const { RangePicker } = AntDatePicker
  return (
    <RangePicker
      {...props}
      style={fullWidth ? { width: "100%" } : undefined}
      format="DD.MM.YYYY"
    />
  );
};

export default TimePicker;
