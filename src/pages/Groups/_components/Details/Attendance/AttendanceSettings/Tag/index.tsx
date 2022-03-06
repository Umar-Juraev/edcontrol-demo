import React, { FC, ReactNode, useState } from "react";
import { Row } from "antd";
import cn from "classnames";
import moment from "moment";

import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  setAttendanceCancelDate,
  setAttendanceDate,
  setAttendanceDefaultDate,
  setAttendanceMovedDate,
  setId,
} from "store/slices/attendance";

import { SettingMoveIcon } from "components/svg";
import { useUpdateLessonMutation } from "store/endpoints";
import toast from "react-hot-toast";
import { PopConfirm } from "components/shared";
import classes from "../../Attendance.module.scss";

export type Actions = "SelectMonth" | "CancelLesson" | "MoveLesson";
interface Tags {
  id?: number;
  to?: number;
  key?: number;
  dayKey?: number;
  cancelKey?: number;
  title?: string | number;
  date?: string;
  value?: any;
  defaults?: string;
  moved?: boolean;
  is_canceled?: boolean
}

export type TagProps = {
  setVisible?: Function | any;
  setClick?: boolean;
  icon?: ReactNode;
  data?: Tags[];
  actions?: Actions;
  canceled?: boolean;
  antCalendar?: boolean
  setCalendar?: any;
  setShow?: any,
  lessonsQuery?: any
};

const Tag: FC<TagProps> = ({
  data,
  setVisible,
  setClick,
  icon,
  actions,
  canceled,
  antCalendar,
  setCalendar,
  setShow,
  lessonsQuery

}) => {
  const [openPicker, setOpenPicker] = useState(false);
  const [item, getItem] = useState<boolean>()
  const dispatch = useAppDispatch();
  const {
    date: selectedDate,
    movedDate,
    cancelDate,
    id: timeId
  } = useAppSelector((state) => state.attendance);

  const [updateLessonMutation] = useUpdateLessonMutation();

  const classNames = cn(
    (actions === "SelectMonth" && classes.SelectMonth) ||
    (actions === "CancelLesson" && classes.CancelLesson) ||
    (actions === "MoveLesson" && classes.MoveLesson)
  );

  const selectedMonth = moment(selectedDate).format("MMMM YYYY");
  const selectedMovedDate = Number(moment(movedDate).format("DD"));
  const selectedCancelDate = Number(moment(cancelDate).format("DD"));

  const handleClick = (item: any) => {
    dispatch(setAttendanceDefaultDate(item.defaults));
    dispatch(setId(item.id));
    getItem(item.is_canceled)
    if (antCalendar) {
      setCalendar(true);
      setShow(true);
    }
  };

  function handleCanceledData() {
    const values = {
      is_canceled: item ? false : true
    };
    const mutationPromise = updateLessonMutation({ id: timeId, ...values });

    toast
      .promise(mutationPromise, {
        loading: `dars kuni o'zgartirilmoqda...`,
        success: `dars muvaffaqqiyatli o'zgartirildi`,
        error: ({ data }) => JSON.stringify(data),
      })
      .then(() => {
        lessonsQuery.refetch();
      });
  }
  return (
    <>
      {data?.map((item) => {
        if (setClick) {
          return (
            <Row
              className={`${classes.item} ${classNames}`}
              align="middle"
              onClick={() => setVisible(item.to)}
              key={item.title}
            >
              {icon && <div style={{ margin: "0 17px 0 0 " }}>{icon}</div>}
              <div>{item.title}</div>
            </Row>
          );
        } else {
          return (
            <PopConfirm
              disabled={!canceled && true}
              title={item.is_canceled ? `Bekor qilish olib tashlansinmi ?` : `Bekor qilishga ishonchingiz komilmi?`}
              onConfirm={() => handleCanceledData()
              }
            >
              <button
                className={classes.btn}
                onBlur={antCalendar ? () => setCalendar(false) : undefined}
                onClick={() => handleClick(item)}
              >
                <Row
                  key={item.title}
                  className={`
                  
                ${classes.item} 
                ${(item.title === selectedMonth ||
                      item.dayKey === selectedMovedDate ||
                      item.is_canceled === true) &&
                    classNames
                    }
              `}
                  align="middle"
                  justify="space-between"
                  onClick={() => {
                    dispatch(
                      item.dayKey
                        ? setAttendanceMovedDate(item.date)
                        : item.cancelKey
                          ? setAttendanceCancelDate(item.date)
                          : setAttendanceDate(item.date)
                    );
                    setOpenPicker(true);
                  }}
                >
                  {item.title}
                  {item.moved && <SettingMoveIcon color="#377DFF" />}
                  {
                    (item.title === selectedMonth ||
                      item.dayKey === selectedMovedDate ||
                      item.is_canceled === true) && <div>{icon}</div>
                  }
                </Row>
              </button>
            </PopConfirm>

          );
        }
      })}
    </>
  );
};

export default Tag;
