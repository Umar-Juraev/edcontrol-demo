import { FC } from "react";
import { Col, Row } from "antd";

import classes from './TeacherMoreAbout.module.scss';
import { TeachersDTO } from "types";
import { separateNumberThousands, separatePhoneNumber } from "utils";
import moment from "moment";
import { genderTypes } from "utils/types";
import { GENDER_STEPS } from "constants/states";

export type Props = {
  user?: TeachersDTO;
};

const TeacherMoreAbout: FC<Props> = ({ user }) => {

  const userData = [
    { key: `Ism, Familiya, Sharif:`, value: user?.full_name },
    { key: `Jins:`, value: GENDER_STEPS[user?.gender as genderTypes]?.name },
    { key: `Tug'ilgan sana:`, value: moment(user?.birth_date).format('DD MMMM YYYY') },
    { key: `Viloyat tuman:`, value: `${user?.district.name}` },
    { key: `Yashash manzili:`, value: user?.address },
    { key: `Maosh:`, value: `${separateNumberThousands(user?.salary)} so'm` },
    { key: `Guruhlar soni:`, value: `${user?.groups_count} guruh` },
    { key: `Telefon raqam:`, value: separatePhoneNumber(user?.phone_number || 0) },
    {
      key: `Qo'shimcha raqam:`,
      value: user?.extra_phone_numbers.length
        && separatePhoneNumber(user?.extra_phone_numbers[0]?.phone_number || 0)
    },
  ]

  return (
    <div>
      {userData?.map(({ key, value }, index) => (
        !!value && (
          <Row key={index} className={classes.list}>
            <Col span={2}>
              <div className={classes.number}>{index + 1}</div>
            </Col>

            <Col className={classes.value} span={8}>{key}</Col>

            <Col className={classes.value} span={12}>{value}</Col>
          </Row>
        )
      ))
      }
    </div>
  );
};

export default TeacherMoreAbout;
