import { Col, Row } from "antd";
import { Badge } from "components/shared";
import moment from "moment";
import { useEffect, useState } from "react";
import { useRoomsQuery } from "store/endpoints";
import { useSchedulesQuery } from "store/endpoints/schedule";
import { useAppSelector } from "store/hooks";
import { LessonTimesByWeekTypes } from "utils/types";

import classes from "./ScheduleTable.module.scss";

export type Props = {};

const ScheduleTable = (props: Props) => {
  const [selectedRoom, setSelectedRoom] = useState(1)
  const [selectedWeekdays, setSelectedWeekdays] = useState<LessonTimesByWeekTypes[]>([])
  const [selectedDay, setSelectedDay] = useState<LessonTimesByWeekTypes>();

  const roomsQuery = useRoomsQuery();

  const { currentUser } = useAppSelector((state) => state.persistedData);

  const schedulesQuery = useSchedulesQuery({
    branch: currentUser.data?.branch.id,
    date_from: "2022-01-01",
    date_to: "2022-02-20"
  })

  useEffect(() => {
    schedulesQuery.data?.map((item) => {
      item.room_id === selectedRoom && setSelectedWeekdays(item.lesson_times_by_weekdays)
    })
  }, [schedulesQuery.data, selectedRoom])


  // const hours = Array.from(
  //   { length: 48 },

  //   (_, hour) => {
  //     return {
  //       time: moment({
  //         hour: Math.floor(hour / 2),
  //         minutes: hour % 2 === 0 ? 0 : 30,
  //       }).format("HH:mm"),
  //       width: 85,
  //     };
  //   }
  // );

  const filtredDayData = selectedDay?.lesson_times?.map(item => ({
    name: item.group_name,
    start: item.start_time,
    end: item.duration_minute,
    classname: item.group_name === 'arab' ? 'arabic'
      : item.group_name === 'dasturlash' ? 'frontend' :
        item.group_name === 'ingliz' ? 'english' : ''
  }))




  return (
    <section>
      <Row gutter={8} wrap={false} className={classes.statusesBox}>
        {roomsQuery?.data?.results.map((item) => (
          <Col key={item.id}>
            <Badge
              text={item.name}
              active={selectedRoom === item.id}
              onClick={() => setSelectedRoom(item.id)}
            />
          </Col>
        ))}
      </Row>
      <div className={classes.schedule}>
        <div className={classes.schedule__boxLeft}>
          <div className={classes.schedule__boxLeft__innerBox}>
            <Badge
              style={{ margin: "0 0 16px 0" }}
              text="Shu haftada"
              fullWidth
            />
            {selectedWeekdays.map((item, i) => {
              return (
                <Badge
                  style={{ margin: "0 0 16px 0" }}
                  key={i}
                  text={item.weekday_name}
                  fullWidth
                  activeBadgeSchedule={selectedDay?.weekday_id === item.weekday_id}
                  onClick={() => setSelectedDay(item)}
                />
              );
            })}
          </div>
        </div>
        <div className={classes.schedule__boxRight}>
          <Row gutter={12} wrap={false} style={{ margin: " 0 0 16px 0 " }}>
            {/* {hours.map((item: any) => {
              return (
                <Badge
                  text={item.time}
                  style={{ width: item.width, margin: "0 6px" }}
                />
              );
            })} */}
          </Row>
          <Row wrap={false}>
            {filtredDayData?.map((item, i) => {
              return (
                <Badge
                  key={i}
                  className={item.classname}
                  text={`${moment(item.start).format('HH:mm')}
                   ${item.end}`}
                  style={{ margin: "0 6px" }}
                />
              );
            })}
          </Row>
        </div>
      </div>
    </section>
  );
};

export default ScheduleTable;
