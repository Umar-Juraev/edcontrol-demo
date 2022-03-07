import { FC } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Card, Skeleton, Row, Col } from "antd";

import { Badge, Button } from "components/shared";
import { BadgeColorsType } from "utils/types";
import {
  TeacherIcon,
  CalendarIcon,
  ClockIcon,
  BookIcon,
  StudentIcon,
} from "components/svg";
import GroupCards from "images/group-photo.png";

import classes from "./GroupCard.module.scss";
interface BadgeProps {
  title?: string;
  type?: BadgeColorsType;
  background?: any;
}

type Props = {
  name?: string;
  teacher?: string;
  photo?: string;
  days?: any;
  startTime?: string;
  startDate?: string;
  endDate?: string;
  room?: string;
  userCount?: number;
  badge?: BadgeProps;
  href: string;
};

const GroupCard: FC<Props> = ({
  name,
  teacher,
  days,
  startTime,
  startDate,
  endDate,
  room,
  userCount,
  badge,
  photo,
  href,
}) => {
  const cardInfo = [
    { icon: <TeacherIcon />, name: teacher },
    {
      icon: <CalendarIcon />,
      name: `${days
        ?.map((item: any) => item.short)
        .join(", ")} - ${startTime}`,
    },
    {
      icon: <ClockIcon />,
      name: `${moment(endDate).diff(moment(startDate), "months")} oy`,
    },
    { icon: <BookIcon />, name: room ? `${room}` : "-----" },
    { icon: <StudentIcon />, name: `${userCount} talaba` },
  ];

  return (
    <Card
      bordered={false}
      className={classes.card}
      cover={
        <img alt="" src={photo || GroupCards} className={classes.cardImage} />
      }
    >
      {/* <section className={classes.cardBadge}>
          <Badge
            text={badge?.title}
          />
        </section> */}

      <div className={classes.cardMetaInfo}>
        <h3>{name}</h3>
        {cardInfo.map((item, i) => (
          <Row gutter={15} key={i} wrap={false}>
            <Col>{item.icon}</Col>

            <Col style={{ overflow: "hidden" }}>
              <div className={classes.itemName}>{item.name}</div>
            </Col>
          </Row>
        ))}
      </div>

      <footer className={classes.cardFooter}>
        <Link to={href}>
          <Button type="primary" fullWidth size="large">
            Batafsil
          </Button>
        </Link>
      </footer>
    </Card>
  );
};

export default GroupCard;
