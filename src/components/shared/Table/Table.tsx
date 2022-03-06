import React, { FC } from "react";
import { Table as AntTable, TableProps } from "antd";
import cn from "classnames";

import "./Table.scss";

export type Props = TableProps<any> & {
  noHead?: boolean;
};

const Table: FC<Props> = ({ noHead = false, ...props }) => {
  const classNames = cn(noHead && "noHead");

  return (
    <div>
      <AntTable
        // sticky
        className={classNames}
        {...props}
      />
    </div>
  );
};

export default Table;
