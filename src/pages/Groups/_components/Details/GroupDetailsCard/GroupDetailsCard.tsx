import { FC } from "react";
import moment from "moment";
import toast from "react-hot-toast";
import { Row, Col } from "antd";
import { useHistory, useParams } from "react-router-dom";

import { useDeleteGroupMutation } from "store/endpoints";
import { Button, PopConfirm } from "components/shared";
import GroupDetailsImg from "images/group-photo-details.png";
import { separateNumberThousands } from "utils";
import { useAppSelector } from "store/hooks";
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
  isLoading,
}) => {
  const { id } = useParams<{ id: any }>();
  const history = useHistory();
  const { currentUser } = useAppSelector((state) => state.persistedData);
  const SUPER_USER = currentUser.data?.role == 1000;
  const CEO = currentUser.data?.role == 999;

  const [deleteGroupMutation, { isLoading: deleteLoading }] =
    useDeleteGroupMutation();

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

  const onDelete = () => {
    const mutationPromise = deleteGroupMutation({ id }).unwrap();
    toast
      .promise(mutationPromise, {
        loading: `o'chirilmoqda...`,
        success: `muvaffaqiyatli o'chirildi`,
        error: ({ data }) => JSON.stringify(data),
      })
      .then(() => history.goBack());
  };

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
        </div>
      </div>
    </div>
  );
};

export default GroupDetailsCard;
