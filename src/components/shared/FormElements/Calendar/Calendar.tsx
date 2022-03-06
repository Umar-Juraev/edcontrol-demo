import React, { FC } from "react";
import { Calendar as AntCalendar, CalendarProps } from "antd";

import { CalendarIcon } from "components/svg";

import "./Calendar.scss";

export type Props = CalendarProps<any> & {};

const Calendar: FC<Props> = ({ ...props }) => {
  function onPanelChange(value: any, mode: any) {
    console.log(value.format("YYYY-MM-DD"), mode);
  }

  return <AntCalendar onPanelChange={onPanelChange} {...props} />;
};

export default Calendar;
