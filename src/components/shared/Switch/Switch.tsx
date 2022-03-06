import React, { FC } from "react";
import { Switch, SwitchProps } from "antd";

import "./Switch.scss";

type Props = SwitchProps & {};

const AntSwitch: FC<Props> = ({ ...props }) => {
  return <Switch {...props} />
};

export default AntSwitch;
