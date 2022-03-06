import { Row, Col, Skeleton } from "antd";
import classes from "./CardStatsSkeleton.module.scss";

const CardStatsSkeleton = () => {
  return (
    <div className={classes.statusSkeleton}>
      <div className={classes.card_stats}>
        <div className={classes.row}>
          <div  className={classes.img}>
            <Skeleton.Avatar shape="circle" active className={classes.avatar} />
          </div>
          <div  className={classes.text}>
            <Skeleton paragraph={{ rows: 1 }} active />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardStatsSkeleton;
