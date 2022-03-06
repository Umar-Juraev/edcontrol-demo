import { FC } from "react";
import moment from "moment";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { Button, PopConfirm } from "components/shared";
import { GENDER_STEPS } from "constants/states";
import {
  checkValueEmpty,
  separateNumberThousands,
  separatePhoneNumber,
} from "utils";

import GenderIcon from "images/gender.svg";
import PhoneICon from "images/phone.svg";
import GroupICon from "images/groups.svg";
import DataIcon from "images/days.svg";
import BalanceIcon from "images/balance-wallet.svg";
import LocationIcon from "images/location-address.svg";
import roleAvatarImage from "images/role-avatar.png";

import { genderTypes } from "utils/types";
import { useAppSelector } from "store/hooks";
import classes from "./UserCardInfo.module.scss";

type UserCardProps = {
  image?: string;
  fullName?: string;
  gender?: string;
  phone?: string;
  birthDay?: string;
  groupsCount?: number;
  price?: number;
  location?: string;
  details?: boolean;
  pathname: string;
  setUpdateModal: (value: boolean) => void;
  onDelete?: () => void;
  deleteLoading?: boolean;
  dataNone?: boolean;
  photo?: string;
};

const UserCardInfo: FC<UserCardProps> = ({
  fullName,
  birthDay,
  gender,
  groupsCount,
  image,
  location,
  phone,
  price,
  details,
  pathname,
  setUpdateModal,
  onDelete,
  deleteLoading,
  dataNone,
}) => {
  const { currentUser } = useAppSelector((state) => state.persistedData);
  const SUPER_USER = currentUser.data?.role == 1000;
  const CEO = currentUser.data?.role == 999;

  const cardData = [
    {
      icon: GenderIcon,
      value: gender && GENDER_STEPS[gender as genderTypes]?.name,
    },
    { icon: PhoneICon, value: phone && separatePhoneNumber(phone) },
    { icon: DataIcon, value: moment(birthDay).format("DD MMMM YYYY") },
    { icon: GroupICon, value: `${groupsCount} ta guruh` },
    { value: `${separateNumberThousands(price)} so'm`, icon: BalanceIcon },
    { value: checkValueEmpty(location), icon: LocationIcon },
  ];

  return (
    <Row
      gutter={[{ xs: 0, sm: 4, md: 12 }, 12]}
      justify="space-between"
      wrap={false}
      align="middle"
      className={
        details
          ? `${classes.user_card_info} ${classes.details}`
          : classes.user_card_info
      }
    >
      <div className={classes.user_card_infor}>
        <Col
          span={3}
          sm={7}
          xs={10}
          md={7}
          lg={9}
          xl={details ? 8 : 4}
          className={details ? classes.user_image_detail : classes.user_image}
        >
          <img
            src={image || roleAvatarImage}
            className={details ? classes.user_image_detail : classes.user_image}
            alt={fullName}
          />
        </Col>

        <Col
          span={details ? 14 : 16}
          sm={14}
          xs={details ? 16 : 13}
          lg={15}
          xl={20}
          className={classes.user_data_container}
        >
          <h2 className={classes.user_name}>{fullName}</h2>

          <Row
            justify="space-between"
            gutter={[0, 10]}
            className={dataNone ? classes.user_data_none : classes.user_grid}
          >
            {cardData.map((i, key) => (
              <Col key={key} span={8} xl={7}>
                <Row
                  gutter={[{ xs: 5, md: 10 }, 16]}
                  align="middle"
                  wrap={false}
                >
                  <Col>
                    <img src={i.icon} alt="" />
                  </Col>
                  <Col className={classes.dataValue}>{i.value}</Col>
                </Row>
              </Col>
            ))}
          </Row>
        </Col>
      </div>
      <Col
        span={details ? 6 : 5}
        xs={details ? 24 : 8}
        sm={8}
        md={4}
        lg={6}
        className={classes.card_btns}
      >
        {details ? (
          <>
            <div className={classes.btn}>
              <Button type="ghost" onClick={() => setUpdateModal(true)}>
                O'zgartirish
              </Button>
            </div>
            {(CEO || SUPER_USER) && (
              <div className={classes.btn}>
                <PopConfirm
                  title="O'chirishga ishonchingiz komilmi?"
                  onConfirm={() => onDelete && onDelete()}
                >
                  <Button size="large" danger fullWidth loading={deleteLoading}>
                    O'chirish
                  </Button>
                </PopConfirm>
              </div>
            )}
          </>
        ) : (
          <div className={classes.btn2}>
            <Link to={pathname}>
              <Button type="primary">Batafsil</Button>
            </Link>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default UserCardInfo;
