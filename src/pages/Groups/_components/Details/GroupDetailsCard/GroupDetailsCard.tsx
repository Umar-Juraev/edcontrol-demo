import { FC } from "react";
import moment from "moment";
import { Row, Col } from "antd";
import { useHistory, useParams } from "react-router-dom";

import { Button, PopConfirm } from "components/shared";
import GroupDetailsImg from "images/group-photo-details.png";
import { separateNumberThousands } from "utils";
import {
  BookIcon,
  CalendarIcon,
  ClockIcon,
  CourseIcon,
  PriceIcon,
  TeacherIcon,
} from "components/svg";

import classes from "./GroupDetailsCard.module.scss";

interface GroupCardProps {
  image?: string;
  name?: string;
  teacher?: string;
  course?: string;
  days?: any;
  startTime?: string;
  startDate?: string;
  endDate?: string;
  room?: string;
  price?: number;
  setUpdateModal: any;
  isLoading?: boolean;
}

const GroupDetailsCard: FC<GroupCardProps> = ({
  image,
  name,
  teacher,
  course,
  days,
  startTime,
  startDate,
  endDate,
  room,
  price,
  setUpdateModal,
}) => {
  const { id } = useParams<{ id: any }>();
  const history = useHistory();

  const cardData = [
    { icon: <CourseIcon />, value: course },
    {
      icon: <CalendarIcon />,
      value: `${days
        ?.map((item: any) => item.short)
        .join(", ")} - ${startTime}`,
    },
    { icon: <TeacherIcon />, value: teacher },
    { icon: <BookIcon />, value: room ? `${room}` : "-----" },
    { icon: <PriceIcon />, value: `${separateNumberThousands(price)} so'm` },
    {
      icon: <ClockIcon />,
      value: `${moment(startDate).format("DD.MM.YYYY")} - ${moment(
        endDate
      ).format("DD.MM.YYYY")}`,
    },
  ];

  return (
    <div className={classes.group_card}>
      <div className={classes.group_card_container}>
        <div className={classes.group_card_infor}>
          <img
            src={image || GroupDetailsImg}
            alt=""
            className={classes.group_image}
          />
          <div className={classes.group_data_container}>
            <h2 className={classes.group_name}>{name}</h2>

            <div className={classes.group_data}>
              {cardData.map((i, key) => (
                <div key={key} className={classes.data_value}>
                  <Row
                    gutter={[{ xs: 5, md: 5 }, 16]}
                    justify="start"
                    wrap={false}
                  >
                    <Col style={{ height: 20 }}>{i.icon}</Col>

                    <Col>{i.value}</Col>
                  </Row>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={classes.card_btns}>
          <div className={classes.btn}>
            <Button type="ghost" onClick={() => setUpdateModal(true)}>
          Change
            </Button>
          </div>
            <div className={classes.btn}>
              <PopConfirm
                title="Are you sure you want to delete it?"
              >
                <Button size="large" danger fullWidth >
                Delete
                </Button>
              </PopConfirm>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetailsCard;
