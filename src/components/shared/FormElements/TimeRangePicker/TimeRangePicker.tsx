import React, { FC } from "react";

import {
  TimePicker as AntTimePicker,
  TimeRangePickerProps,
} from "antd";

import "./TimeRangePicker.scss";

export type Props = TimeRangePickerProps & {
  fullWidth?: boolean;
};

const TimePicker: FC<Props> = ({ fullWidth, ...props }) => {
  const { RangePicker } = AntTimePicker

  const format = "HH:mm";

  return (
    <RangePicker
      {...props}
      style={fullWidth ? { width: "100%" } : undefined}
      format={format}
    />
  );
};

export default TimePicker;
