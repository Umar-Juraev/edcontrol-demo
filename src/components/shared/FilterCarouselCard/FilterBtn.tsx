import React from "react";
import { Row } from "antd";
import { ArrowLeft, ArrowRight } from "components/svg";

import classes from "./FilterCarouselCard.module.scss";

export type Props = {
  custome: any;
};

const FilterBtn = ({ custome }: Props) => {
  const gotoNext = () => {
    custome.current.slickNext();
  };

  const gotoPrev = () => {
    custome.current.slickPrev();
  };

  return (
    <Row>
      <button
        className={classes.button}
        onClick={() => gotoPrev()}
      >
        <ArrowLeft />
      </button>
      <button className={classes.button} onClick={() => gotoNext()}>
        <ArrowRight />
      </button>
    </Row>
  );
};

export default FilterBtn;
