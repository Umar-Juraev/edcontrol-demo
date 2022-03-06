import { FC } from "react";
import { Link } from "react-router-dom";

import classes from "./CardStats.module.scss";
interface CardStatsProps {
  image?: string;
  value?: string | number;
  types?: string;
  isLoading?: boolean;
  pathName?: any;
  price?: boolean;
}

const CardStats: FC<CardStatsProps> = ({
  image,
  value,
  types,
  isLoading,
  pathName,
  price,
}) => {
  return (
    <Link to={pathName} className={classes.link}>
      <div className={`${classes.card_stats} ${price ? classes.small : ""}`}>
        <div className={classes.card_stats_container}>
          <img src={image} alt="" className={`${classes.card_stats_img} ${price ? classes.small : ""}`} />
          <div className={classes.card_stats_inf}>
            <h2
              className={`${classes.inf_number} ${price ? classes.small : ""}`}
            >
              {value}
            </h2>
            <p className={classes.inf_name}>{types}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardStats;
