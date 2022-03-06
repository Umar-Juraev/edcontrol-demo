import React, { FC } from "react";
import { Checkbox, CheckboxProps } from "antd";

import "./CheckBox.scss";


type Props = CheckboxProps & {
  canceled?: boolean;
  moved?: boolean | string;
}

const AntCheckbox: FC<Props> = ({ canceled, moved, ...props }) => {

  return (
    <Checkbox
      className={`${canceled && 'canceledCheckbox'} ${moved && 'movedCheckbox'}`}
      {...props}
    />
  )
}

export default AntCheckbox;