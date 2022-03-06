import { FC } from "react";
import moment from "moment";
import { Card, Skeleton, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { GROUP_TYPE } from "constants/states";

import { separateNumberThousands } from "utils";
import { Badge, Button } from "components/shared";
import { BadgeColorsType } from "utils/types";
import GroupCards from "images/group-photo.png";
import {
  PriceIcon,
  CourseTypeIcon,
  TimeIcon,
  ClockIcon
} from "components/svg";

import classes from "./CourseCard.module.scss";

interface BadgeProps {
  title?: string;
  type?: BadgeColorsType;
  background?: any;
}

type Props = {
  name?: string;
  image?: string;
  price?: string | number;
  type?: number;
  lessonDuration?: number;
  courseDuration?: number;
  usersCount?: number;
  badge?: BadgeProps;
  href: string;
  loading?: boolean;
};

const GroupCard: FC<Props> = ({
  badge,
  name,
  image,
  price,
  type,
  lessonDuration,
  courseDuration,
  usersCount,
  href,
  loading
}) => {

  const cardInfo = [
    { icon: <PriceIcon />, name: `${separateNumberThousands(price)} so'm` },
    { icon: <CourseTypeIcon />, name: GROUP_TYPE.filter((item) => item.value === type)[0].title },
    { icon: <TimeIcon />, name: `${lessonDuration} daqiqa` },
    { icon: <ClockIcon />, name: `${courseDuration} oy` },
    // { icon: <StudentIcon />, name: `${usersCount} talaba` },
  ]

  return (
    <>
      <Card
        bordered={false}
        className={classes.card}
        cover={<img alt="" src={image || GroupCards} className={classes.cardImage} />}
      >
        {/* <section className={classes.cardBadge}>
          <Badge
            text={badge?.title}
          />
        </section> */}

        <div className={classes.cardMetaInfo}>
          {loading ? (
            <Skeleton paragraph={{ rows: 0 }} active />
          ) : (
            <h3>{name}</h3>
          )}
          {cardInfo.map((item, i) => (
            <Row gutter={15} key={i}>
              <Col>
                {loading ? <Skeleton.Avatar size={20} active /> : item.icon}
              </Col>

              <Col>
                {loading ? (
                  <Skeleton
                    paragraph={{ rows: 0 }}
                    active
                    className={classes.width}
                  />
                ) : (
                  <div className={classes.itemName}>{item.name}</div>
                )}
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
    </>
  );
};

export default GroupCard;
