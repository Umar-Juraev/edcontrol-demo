import { Col, Row } from "antd";
import { Badge } from "components/shared";
import moment from "moment";
import { useEffect, useState } from "react";
import { useAppSelector } from "store/hooks";
import { LessonTimesByWeekTypes } from "utils/types";

import classes from "./ScheduleTable.module.scss";

export type Props = {};

const ScheduleTable = (props: Props) => {
  const [selectedRoom, setSelectedRoom] = useState(1)
  const [selectedWeekdays, setSelectedWeekdays] = useState<LessonTimesByWeekTypes[]>([])
  const [selectedDay, setSelectedDay] = useState<LessonTimesByWeekTypes>();

  // const roomsQuery = useRoomsQuery();

  const { currentUser } = useAppSelector((state) => state.persistedData);




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
        {/* {roomsQuery?.data?.results.map((item) => (
          <Col key={item.id}>
            <Badge
              text={item.name}
              active={selectedRoom === item.id}
              onClick={() => setSelectedRoom(item.id)}
            />
          </Col>
        ))} */}
      </Row>
      <div className={classes.schedule}>
        <div className={classes.schedule__boxLeft}>
          <div className={classes.schedule__boxLeft__innerBox}>
            <Badge
              
              text="Shu haftada"
              fullWidth
            />
            {selectedWeekdays.map((item, i) => {
              return (
                <Badge
                  
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
          <Row gutter={12} wrap={false} >
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
