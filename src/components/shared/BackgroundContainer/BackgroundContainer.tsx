import cn from "classnames";
import React from "react";

import classes from "./BackgroundContainer.module.scss";

export type Props = {
  onClick?: any;
  transparent?: boolean;
};

const BackgroundContainer = ({ onClick, transparent }: Props) => {
  const className = cn(classes.container, transparent && classes.transparent);

  return <div onClick={onClick} className={className}></div>;
};

export default BackgroundContainer;
