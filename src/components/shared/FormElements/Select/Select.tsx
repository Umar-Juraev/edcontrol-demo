import React, { FC } from "react";
import { Select as AntSelect, SelectProps as AntSelectProps } from "antd";
import cn from "classnames";

import { SelectOptionTypes } from "utils/types";

import "./Select.scss";

export type SelectProps = AntSelectProps<any> & {
  className?: string;
  fullWidth?: boolean;
  label?: string;
  size?: string;
  options?: SelectOptionTypes[];
  navigation?: boolean;
};

const Select: FC<SelectProps> = ({
  children,
  label,
  className,
  fullWidth,
  options,
  size,
  navigation,
  ...props
}) => {
  const classNames = cn(
    className && className,
    fullWidth && "full-width",
    size && size,
    navigation && "navigation"
  );

  return (
    <div style={{ position: "relative" }}>
      {label && <span className={"select-label"}>{label}</span>}

      <AntSelect
        className={classNames}
        filterOption={(input: any, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        {...props}
      >
        {options?.map(({title,value,key}) => (
          <AntSelect.Option  key={key} value={value ? value : ""}>
            {title}
          </AntSelect.Option>
        ))}
      </AntSelect>
    </div>
  );
};

export default Select;
