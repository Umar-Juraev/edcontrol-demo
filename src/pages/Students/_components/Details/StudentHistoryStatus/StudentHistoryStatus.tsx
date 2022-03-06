import { FC } from "react";
import { Table } from "components/shared";
import { LogsTypes } from "utils/types";
import { TableColumnsType } from "antd";
import moment from "moment";

type Props = {
  data?: LogsTypes[];
};

const StudentHistoryStatus: FC<Props> = ({ data }) => {
  const columns: TableColumnsType = [
    {
      title: "№",
      dataIndex: `index`,
      key: `index`,
      render: (value, record: any, index) => (
        <div className="indexWrapper">{index + 1}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: `text`,
      key: `text`,
      render: (value) => <div dangerouslySetInnerHTML={{ __html: value.split('.')[0] }} />
    },
    {
      title: "Hodisa muallifi",
      dataIndex: `employee`,
      key: `employee`,
    }
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data || []}
        pagination={false}
      />
    </>
  )
};

export default StudentHistoryStatus;
