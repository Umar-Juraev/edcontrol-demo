import { FC } from "react";
import moment from "moment";
import { Col, Row } from "antd";

import { Button, PopConfirm } from "components/shared";
import { GENDER_STEPS, USER_ROLE_STATES } from "constants/states";
import { checkValueEmpty, separatePhoneNumber } from "utils";
import { genderTypes, UserRoleCodeTypes } from "utils/types";
import { RoleAvatarIcon } from "components/svg";
import { EmployeesDTO } from "types";
import { useAppSelector } from "store/hooks";

import GenderIcon from "images/gender.svg";
import PhoneICon from "images/phone.svg";
import DataIcon from "images/days.svg";
import LocationIcon from "images/location-address.svg";
import manImage from "images/group-teacher-photo.png";
import womanImage from "images/woman-image.jpg";

import classes from "./EmployeeCard.module.scss";

type UserCardProps = {
  image?: string;
  fullName?: string;
  gender?: string;
  phone?: string;
  birthDay?: string;
  location?: string;
  role?: string | number;
  onDelete: () => void;
  onClick: (value?: EmployeesDTO) => void;
  setUpdateModal: (value: boolean) => void;
  deleteLoading?: boolean;
};

const UserCardInfo: FC<UserCardProps> = ({
  fullName,
  birthDay,
  gender,
  image,
  location,
  phone,
  role,
  onClick,
  onDelete,
  setUpdateModal,
  deleteLoading,
}) => {
  const { currentUser } = useAppSelector((state) => state.persistedData);
  const SUPER_USER = currentUser.data?.role == 1000;
  const CEO = currentUser.data?.role == 999;

  const employeeData = [
    {
      icon: GenderIcon,
      value: gender && GENDER_STEPS[gender as genderTypes].name,
    },
    { icon: PhoneICon, value: phone && separatePhoneNumber(phone) },
    { icon: DataIcon, value: moment(birthDay).format("DD MMMM YYYY") },
    { value: checkValueEmpty(location), icon: LocationIcon },
  ];

  return (
    <Row
      wrap={false}
      className={classes.user_card_info}
    >
      <Col span={4} sm={6} xs={8} md={6} lg={4}>
        <img
          src={image ? image : gender === "male" ? manImage : womanImage}
          alt=""
          className={classes.user_image}
        />
      </Col>

      <Col span={10} className={classes.user_data_container} md={12} lg={10}>
        <h2 className={classes.user_name}>{fullName}</h2>

        <Row justify="space-between" gutter={[0, 10]}>
          {employeeData.map((i, key) => (
            <Col key={key} span={12}>
              <Row gutter={10} align="middle" wrap={false}>
                <Col>
                  <img src={i.icon} alt="" />
                </Col>
                <Col className={classes.dataValue}>{i.value}</Col>
              </Row>
            </Col>
          ))}
        </Row>
      </Col>

      <Col span={4} className={classes.user_data_container} lg={4}>
        <Row align="middle" gutter={[0, 10]} style={{ height: "100%" }}>
          {/* <Col span={8} > */}
          <Row gutter={10} align="middle">
            <Col style={{ display: "flex", alignItems: "center" }}>
              {" "}
              <RoleAvatarIcon />
            </Col>
            <Col className={classes.dataValue}>
              {USER_ROLE_STATES[role as UserRoleCodeTypes].name}
            </Col>
          </Row>
          {/* </Col> */}
        </Row>
      </Col>

      <Col span={5} className={classes.card_btns} xs={24} sm={24} lg={4}>
        <>
          <div className={classes.btn}>
            <Button
              type="ghost"
              onClick={() => {
                onClick();
                setUpdateModal(true);
              }}
            >
              O'zgartirish
            </Button>
          </div>
          {(CEO || SUPER_USER) && (
            <div className={classes.btn}>
              <PopConfirm
                title="O'chirishga ishonchingiz komilmi?"
                onConfirm={() => onDelete()}
              >
                <Button
                  size="large"
                  danger
                  fullWidth
                  loading={deleteLoading}
                  onClick={() => onClick()}
                >
                  O'chirish
                </Button>
              </PopConfirm>
            </div>
          )}
        </>
      </Col>
    </Row>
  );
};

export default UserCardInfo;
