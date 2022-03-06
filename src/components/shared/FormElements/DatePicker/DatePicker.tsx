import React, { FC } from "react";
import {
  DatePicker as AntDatePicker,
  DatePickerProps as AntDatePickerProps
} from "antd";

import { CalendarIcon } from "components/svg";

import "./DatePicker.scss";

export type DatePickerProps = AntDatePickerProps & {
  width?: string;
  ref?: any;
};

const DatePicker: FC<DatePickerProps> = ({ width, ref, ...props }) => {
  return (
    <AntDatePicker
      ref={ref}
      suffixIcon={<CalendarIcon />}
      format="DD MMMM YYYY"
      style={{ width: `${width ? width : "100%"}` }}
      {...props}
    />

  );
};

export default DatePicker;
