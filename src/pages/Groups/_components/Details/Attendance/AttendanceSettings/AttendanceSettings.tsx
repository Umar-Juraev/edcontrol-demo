import { FC, useState } from "react";
import _ from "lodash";
import moment from "moment";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { LessonsDTO } from "types";
import { useAppSelector } from "store/hooks";
import { FormElements } from "components/shared";
import {
  useLessonsBygroupQuery,
  useUpdateLessonMutation,
} from "store/endpoints";
import {
  CheckedIcon,
  SettingCancelIcon,
  SettingMoveIcon,
} from "components/svg";
import SettingActions from "./Actions";
import Tag from "./Tag";

import classes from "../Attendance.module.scss";

export type Props = {
  visible: number;
  setVisible: Function;
  lessonsData?: LessonsDTO[];
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
  const { id } = useParams<{ id: any }>();
  const lessonsByGroupQuery = useLessonsBygroupQuery({ group: id });
  const { defaultDate, id: timeId, } = useAppSelector(
    (state) => state.attendance
  );
  const [updateLessonMutation] = useUpdateLessonMutation();


  const handleChangeMovedData = (e: any) => {
    const values = {
      moved_time: moment(e).format("YYYY-MM-DDThh:mm"),
    };

    const mutationPromise = updateLessonMutation({ id: timeId, ...values });

    toast
      .promise(mutationPromise, {
        loading: `dars kuni ko'chirilmoqda...`,
        success: `dars muvaffaqqiyatli ko'chirildi`,
        error: ({ data }) => JSON.stringify(data),
      })
      .then(() => {
        lessonsQuery.refetch();
        setShow(false);
      });
  };


  const tagItems = [
    { key: 1, title: "Oyni tanlash", to: 1 },
    { key: 2, title: "Darsni bekor qilish", to: 2 },
    { key: 3, title: "Darsni ko'chirish", to: 3 },
  ];

  const getMonths = lessonsByGroupQuery.data?.map((item) => ({
    key: Number(moment(item.moved_time ? item.moved_time : item.scheduled_time).format("M")),
    title: moment(item.moved_time ? item.moved_time : item.scheduled_time).format("MMMM YYYY"),
    date: moment(item.moved_time ? item.moved_time : item.scheduled_time).toString()
  }))
  const selectMonths = _.uniqBy(getMonths, (item) => item.title); 

  const lessonDates = lessonsData?.map((item) => ({
    id: item.id,
    dayKey: Number(moment(item.moved_time ? item.moved_time : item.scheduled_time).format("DD")),
    title: moment(item.moved_time ? item.moved_time : item.scheduled_time).format("DD MMMM"),
    date: moment(item.moved_time ? item.moved_time : item.scheduled_time).toString(),
    defaults: moment(item.moved_time ? item.moved_time : item.scheduled_time).format("DD/MM/YYYY"),
    moved: item.moved_time && true
  }));

  const cancelDates = lessonsData?.map((item) => ({
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
          title="Oyni tanlash"
          action="SelectMonth"
          icon={<CheckedIcon />}
        />
      )}

      {visible === 2 && (
        <SettingActions
          setVisible={setVisible}
          dataSource={cancelDates}
          action="CancelLesson"
          title="Darsni bekor qilish"
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
          title="Darsni ko'chirish"
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
