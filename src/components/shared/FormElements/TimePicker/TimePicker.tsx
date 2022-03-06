import React, { FC } from "react";

import {
  TimePicker as AntTimePicker,
  TimePickerProps
} from "antd";

import "./TimePicker.scss";

export type Props = TimePickerProps & {
  width?: string;
};

const TimePicker: FC<Props> = ({ width, ...props }) => {

  const format = "HH:mm";

  return (
    <AntTimePicker
      {...props}
      style={{ width: `${width ? width : "100%"}` }}
      format={format}
    />
  );
};

export default TimePicker;
