import { FC } from "react";
import { TableColumnsType } from "antd";

import { Table } from "components/shared";
import { LogsTypes } from "utils/types";
import moment from "moment";

export type Props = {
  data?: LogsTypes[];
};

const TeacherHistoryLogs: FC<Props> = ({ data }) => {

  const columns: TableColumnsType = [
    {
      title: "№",
      dataIndex: `index`,
      key: `index`,
      render: (value, record: any, index) => <div className="indexWrapper">{index + 1}</div>
    },
    {
      title: "Hodisa nomi",
      dataIndex: `text`,
      key: `text`,
      render: (value) => <div dangerouslySetInnerHTML={{ __html: value.split('.')[0] }}  />
    },
    {
      title: "Sana",
      dataIndex: `created_time`,
      key: `created_time`,
      render: (value, record: any) => <div>{moment(value).format('DD MMMM YYYY - HH:mm')}</div>
    },
    {
      title: "Hodisa muallifi",
      dataIndex: `employee`,
      key: `employee`
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data || []}
        pagination={false}
      />
    </div>
  );
};

export default TeacherHistoryLogs;
