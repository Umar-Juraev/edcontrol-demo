import React from "react";
import { Row, Skeleton } from "antd";
import classes from "./style.module.scss";

const BreadCrumbSkeleton = () => {
  return (
    <Row>
      <Skeleton
        paragraph={{ rows: 0 }}
        active
        className={classes.link_cancel}
      />
      <span className={classes.slash}>/</span>
      <Skeleton
        paragraph={{ rows: 0 }}
        active
        className={classes.link_cancel}
      />
    </Row>
  );
};

export default BreadCrumbSkeleton;
