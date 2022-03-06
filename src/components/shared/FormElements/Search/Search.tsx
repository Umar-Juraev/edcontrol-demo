import React, { FC, ChangeEvent } from "react";
import { Input } from "antd";

import classes from "./Search.module.scss";
import { NavSearchIcon } from "components/svg";

type Props = {
  value?: string;
  placeholder?: string;
  loading?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (value: string) => void;
};

const Search: FC<Props> = ({
  value,
  placeholder,
  loading,
  onChange,
  onSearch,
  ...props
}) => {
  const { Search: AntdSearch } = Input;

  return (
    <AntdSearch
      value={value}
      loading={loading}
      onChange={onChange}
      placeholder={placeholder}
      onSearch={onSearch}
      className={classes.searchInput}
      bordered={false}
      {...props}
    />
  );
};

export default Search;
