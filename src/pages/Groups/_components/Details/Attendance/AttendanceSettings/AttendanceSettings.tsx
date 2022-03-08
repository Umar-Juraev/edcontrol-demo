import { FC, useState } from "react";
import _ from "lodash";
import moment from "moment";

import { useAppSelector } from "store/hooks";
import { FormElements } from "components/shared";

import {
  CheckedIcon,
  SettingCancelIcon,
  SettingMoveIcon,
} from "components/svg";
import SettingActions from "./Actions";
import Tag from "./Tag";

import classes from "../Attendance.module.scss";
import { lessonAPI, lessonByGroupAPI } from "fakeAPI/fakeAPI";
import { LessonsDTO } from "types";

export type Props = {
  visible: number;
  setVisible: Function;
  lessonsData?: any;
  lessonsQuery?: any;
};

const Settings: FC<Props> = ({
  visible,
  setVisible,
  lessonsData,
  lessonsQuery,
}) => {
  const [show, setShow] = useState(true);
  const [calendar, setCalendar] = useState(false);
  const { defaultDate, id: timeId, } = useAppSelector(
    (state) => state.attendance
  );


  const handleChangeMovedData = (e: any) => {

        setShow(false);
  };


  const tagItems = [
    { key: 1, title: "Select the month", to: 1 },
    { key: 2, title: "Cancel the lesson", to: 2 },
    { key: 3, title: "Change the lesson", to: 3 },
  ];

  

  const getMonths = lessonByGroupAPI.results.map((item) => ({
    key: Number(moment(item.moved_time ? item.moved_time : item.scheduled_time).format("M")),
    title: moment(item.moved_time ? item.moved_time : item.scheduled_time).format("MMMM YYYY"),
    date: moment(item.moved_time ? item.moved_time : item.scheduled_time).toString()
  }))
  const selectMonths = _.uniqBy(getMonths, (item) => item.title); 

  const lessonDates = lessonsData.map((item: LessonsDTO) => ({
    id: item.id,
    dayKey: Number(moment(item.moved_time ? item.moved_time : item.scheduled_time).format("DD")),
    title: moment(item.moved_time ? item.moved_time : item.scheduled_time).format("DD MMMM"),
    date: moment(item.moved_time ? item.moved_time : item.scheduled_time).toString(),
    defaults: moment(item.moved_time ? item.moved_time : item.scheduled_time).format("DD/MM/YYYY"),
    moved: item.moved_time && true
  }));

  const cancelDates = lessonsData.map((item: LessonsDTO) => ({
    id: item.id,
    cancelKey: Number(moment(item.moved_time ? item.moved_time : item.scheduled_time).format("DD")),
    title: moment(item.moved_time ? item.moved_time : item.scheduled_time).format("DD MMMM"),
    date: moment(item.moved_time ? item.moved_time : item.scheduled_time).toString(),
    is_canceled: item.is_canceled
  }));
  

  return (
    <div className={classes.attendContainer}>
      {visible === 0 && (
        <Tag data={tagItems} setVisible={setVisible} setClick={true} />
      )}

      {visible === 1 && (
        <SettingActions
          setVisible={setVisible}
          dataSource={selectMonths}
          title="Select the month"
          action="SelectMonth"
          icon={<CheckedIcon />}
        />
      )}

      {visible === 2 && (
        <SettingActions
          setVisible={setVisible}
          dataSource={cancelDates}
          action="CancelLesson"
          title="Cancel the lesson"
          icon={<SettingCancelIcon />}
          lessonsQuery={lessonsQuery}
          canceled
        />
      )}

      {visible === 3 && (
        <SettingActions
          setVisible={setVisible}
          dataSource={lessonDates}
          action="MoveLesson"
          title="Change the lesson"
          icon={<SettingMoveIcon />}
          calendar={calendar}
          setCalendar={setCalendar}
          setShow={setShow}
          antCalendar
        />
      )}

      {calendar && (
        <div className="calendar">
          <FormElements.DatePicker
            onChange={(e) => handleChangeMovedData(e)}
            defaultValue={moment(defaultDate, "DD/MM/YYYY")}
            open={show}
          />
        </div>
      )}
    </div>
  );
};

export default Settings;
