import { FC } from "react";
import toast from "react-hot-toast";
import { Row, Col, Skeleton } from "antd";
import { useParams, useHistory } from "react-router-dom";

import { useAppSelector } from "store/hooks";
import { separateNumberThousands } from "utils"
import { Button, PopConfirm } from "components/shared";
import { useDeleteCourseMutation } from "store/endpoints";
import GroupDetailsImg from "images/group-photo-details.png";
import { PriceIcon, ClockIcon, TimeIcon, StudentIcon } from "components/svg"

import classes from "./CourseDetailsCard.module.scss";

type GroupCardProps = {
  image?: string;
  name?: string;
  price?: number;
  lessonDuration?: number;
  courseDuration?: number;
  usersCount?: number | string;
  setUpdateModal: any;
  isLoading?: boolean;
};

const CourseDetailsCard: FC<GroupCardProps> = ({
  image,
  name,
  price,
  lessonDuration,
  courseDuration,
  usersCount,
  setUpdateModal,
  isLoading,
}) => {
  const { id } = useParams<{ id: any }>();
  const history = useHistory()

  const { currentUser } = useAppSelector(state => state.persistedData)
  const SUPER_USER = currentUser.data?.role == 1000
  const CEO = currentUser.data?.role == 999

  const [deleteCourseMutation, { isLoading: deleteLoading }] = useDeleteCourseMutation()

  const CardData = [
    { icon: <PriceIcon />, value: `${separateNumberThousands(price)} so'm` },
    { icon: <ClockIcon />, value: `${courseDuration} oy` },
    { icon: <TimeIcon />, value: `${lessonDuration} daqiqa` },
    { icon: <StudentIcon />, value: `${usersCount}` },
  ];

  const onDelete = () => {
    const mutationPromise = deleteCourseMutation({ id }).unwrap()
    toast
      .promise(mutationPromise, {
        loading: `o'chirilmoqda...`,
        success: `muvaffaqiyatli o'chirildi`,
        error: (({ data }) => JSON.stringify(data))
      })
      .then(() => history.goBack())
  };

  return (
    <div className={classes.group_card}>
      <div className={classes.group_card_container}>
        <div className={classes.group_card_infor}>
          <img src={image || GroupDetailsImg} alt="" className={classes.group_image} />

          <div className={classes.group_data_container}>
            <h2 className={classes.group_name}>{name}</h2>

            <Row className={classes.group_data} justify="space-between" >
              {CardData.map((i, key) => (
                <Col key={key} className={classes.data_value}>
                  <Row gutter={[10, 0]} justify="start" wrap={false}>
                    <Col>{i.icon}</Col>

                    <Col>{i.value}</Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </div>
        </div>
        <div className={classes.card_btns}>
          <div className={classes.btn}>
            <Button type="ghost" onClick={() => setUpdateModal(true)}>
              O'zgartirish
            </Button>
          </div>
          {
            (CEO || SUPER_USER) &&  (
              <div className={classes.btn}>
                {isLoading ? (
                  <Skeleton.Button
                    active
                    className={classes.btn_skeleton}
                  />
                ) : (
                  <PopConfirm title="O'chirishga ishonchingiz komilmi?" onConfirm={() => onDelete()} >
                    <Button size="large" danger fullWidth loading={deleteLoading}>O'chirish</Button>
                  </PopConfirm>
                )}
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
