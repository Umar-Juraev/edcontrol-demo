import { FC, useRef } from "react";
import Slider from "react-slick";

import { Row, Col } from "antd";
// import { DirectionsDTO, UsersDTO } from "types";
// import { useDirectionsQuery, useStudentsFullQuery } from "store/endpoints";
import { ArrowLeft, ArrowRight } from "components/svg";
import { Badge } from "..";

import classes from "./FilterUsersCarousel.module.scss";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export type Props = {
  title?: string;
  type?: `direction` | `teacher` | `student`;
  selectedDirection?: any | null;
  selectedStudent?: any | null;
  setSelectedDirection: (item?: any) => void;
  setSelectedStudent: (item?: any) => void;
};

const FilterUser: FC<Props> = ({
  title,
  type,
  selectedDirection,
  selectedStudent,
  setSelectedDirection,
  setSelectedStudent,
}) => {
  const sliderRef = useRef<Slider>(null);

  // const directionsQuery = useDirectionsQuery();
  // const studentsQuery = useStudentsFullQuery();

  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 2,
  };

  const gotoNext = () => {
    sliderRef.current?.slickNext();
  };

  const gotoPrev = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <div style={{ marginTop: 16 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 12 }}>
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
            <Row gutter={8} key={direction.id}>
              <Col>
                <Badge
                  text={direction.name}
                  active={selectedDirection?.id === direction.id}
                  onClick={() => setSelectedDirection(direction)}
                  style={{ minWidth: "130px", padding: "0 8px" }}
                />
              </Col>
            </Row>
          ))} */}

        {/* {type === "student" &&
          studentsQuery.data?.map((student) => (
            <div
              className={
                selectedStudent?.id !== student.id
                  ? classes.card
                  : `${classes.card} ${classes.activeCard}`
              }
              onClick={() => setSelectedStudent(student)}
            >
              <div className={classes.imgCont}>
                {student?.photo?.file ? (
                  <img src={student?.photo?.file} alt="" />
                ) : (
                  <div className={classes.name_first_characters}>
                    <span>
                      {student?.full_name.slice(0, 1).toLocaleUpperCase()}
                    </span>
                    <span>{student?.full_name.split(" ")[1]?.slice(0, 1)}</span>
                  </div>
                )}
              </div>
              <div className={classes.cont}>
                <p className={classes.name}>
                  {student?.full_name.split(" ", 1)}
                </p>
                <p className={classes.name}>
                  {student?.full_name.split(" ")[1]}
                </p>
              </div>
            </div>
          ))} */}
      </Slider>
    </div>
  );
};

export default FilterUser;
