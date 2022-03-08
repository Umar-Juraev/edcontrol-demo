import { FC } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { Button } from "components/shared";

import Phone from "images/phone.svg";
import Groups from "images/groups.svg";
import UserImage from "images/group-teacher-photo.png";

import classes from "./UsersCard.module.scss";
import { separatePhoneNumber } from "utils";

interface UsersCardProps {
  image?: string;
  name?: string;
  phoneNumber: string;
  groupsCount?: number;
  pathname: number;
}

const UsersCard: FC<UsersCardProps> = ({
  image,
  name,
  phoneNumber,
  groupsCount,
  pathname,
}) => {
  return (
    <div className={classes.card}>
      <Row gutter={[{ xs: 10, md: 20 }, 24]}>
        <Col span={10}>
          <img src={UserImage} alt="" className={classes.image} />
        </Col>

        <Col span={14}>
          <h3>{name}</h3>
          <Row gutter={[0, 12]}>
            <Col className={classes.flex} span={24}>
              <img src={Phone} alt="" />
              <span>{separatePhoneNumber(phoneNumber)}</span>
            </Col>

            <Col className={classes.flex} span={24}>
              <img src={Groups} alt="" />
              <span>{groupsCount} guruhlar</span>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Link to={`/admin/teachers/${pathname}`}>
            <Button fullWidth type="primary" size="large">
              Batafsil
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default UsersCard;
