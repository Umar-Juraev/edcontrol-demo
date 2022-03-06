import { FC } from "react";
import { Badge as BadgeAntd, BadgeProps } from "antd";
import cn from "classnames";

import "./Badge.scss";

type Props = BadgeProps & {
  text?: string | number;
  active?: boolean;
  fullWidth?: boolean;
  activeBadgeSchedule?: boolean;
  type?: "default" | "round";
  onClick?: (e?: any) => void;
};

const Badge: FC<Props> = ({
  text,
  active,
  activeBadgeSchedule,
  fullWidth,
  onClick,
  type = "default",
  children,
  ...props
}) => {
  const classnames = cn(
    "antBadge",
    fullWidth && "fullWidth",
    active && "activeBadge",
    activeBadgeSchedule && "activeBadgeSchedule",
    type === "round" && "roundedBadge"
  );

  return (
    <span onClick={() => onClick && onClick()}>
      <BadgeAntd count={text} className={classnames} {...props}>
        {children}
      </BadgeAntd>
    </span>
  );
};

export default Badge;
