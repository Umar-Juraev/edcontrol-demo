import { FC, useRef } from "react";
import Slider from "react-slick";

import { Row, Col } from "antd";
// import { DirectionsDTO, TeachersDTO } from "types";
// import { useDirectionsQuery, useTeachersFullQuery } from "store/endpoints";
import { ArrowLeft, ArrowRight } from "components/svg";
import { Badge } from "..";

import classes from "./FilterCarouselCard.module.scss";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { teacherAPI } from "fakeAPI/fakeAPI";

export type Props = {
  title?: string;
  type?: `direction` | `teacher` | `student`;
  selectedDirection?: any | null;
  selectedTeacher?: any | null;
  setSelectedDirection: (item?: any) => void;
  setSelectedTeacher?: any;
};

const FilterCarouselCard: FC<Props> = ({
  title,
  type,
  selectedDirection,
  selectedTeacher,
  setSelectedDirection,
  setSelectedTeacher,
}) => {
  const sliderRef = useRef<Slider>(null);

  // const directionsQuery = useDirectionsQuery();
  // const teachersQuery = useTeachersFullQuery();

  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const gotoNext = () => {
    sliderRef.current?.slickNext();
  };

  const gotoPrev = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <div style={{ margin: "16px 0" }}>
      <Row justify="space-between" align="middle" >
        <span className={classes.label}>{title}</span>
        <Row>
          <span
            style={{ margin: " 0 4px 0 0" }}
            className={classes.button}
            onClick={() => gotoPrev()}
          >
            <ArrowLeft />
          </span>
          <span className={classes.button} onClick={() => gotoNext()}>
            <ArrowRight />
          </span>
        </Row>
      </Row>

      <Slider {...settings} ref={sliderRef}>
        {/* {type === "direction" &&
          directionsQuery.data?.map((direction) => (
            <Row key={direction.id} onClick={() => setSelectedDirection(direction)} >
              <Col >
                <Badge
                  fullWidth
                  text={direction.name}
                  active={selectedDirection?.id === direction.id}
                />
              </Col>
            </Row>
          ))} */} 

        {type === "teacher" &&
         teacherAPI.results?.map((teacher) => (
            <div
              className={
                selectedTeacher?.id !== teacher.id
                  ? classes.card
                  : `${classes.card} ${classes.activeCard}`
              }
              onClick={() => setSelectedTeacher(teacher)}
            >
              <div className={classes.imgCont}>
                {teacher?.photo?.file ? (
                  <img src={teacher?.photo?.file} alt="" />
                ) : (
                  <div className={classes.name_first_characters}>
                    <span>
                      {teacher?.full_name.slice(0, 1).toLocaleUpperCase()}
                    </span>
                    <span>{teacher?.full_name.split(" ")[1]?.slice(0, 1)}</span>
                  </div>
                )}
              </div>
              <div className={classes.cont}>
                <p className={classes.name}>
                  {teacher?.full_name.split(" ", 1)}
                </p>
                <p className={classes.name}>
                  {teacher?.full_name.split(" ")[1]}
                </p>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default FilterCarouselCard;
