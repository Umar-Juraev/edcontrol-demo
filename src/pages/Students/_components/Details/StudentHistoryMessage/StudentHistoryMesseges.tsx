import { FC } from "react";
import { Table } from "components/shared";
import { LogsTypes } from "utils/types";
import { TableColumnsType } from "antd";
import moment from "moment";
import { checkValueEmpty } from "utils";

type Props = {
  data?: LogsTypes[];
  setVisible: (bool: boolean) => void;
};

const StudentHistoryMesseges: FC<Props> = ({ data, setVisible }) => {
  const columns: TableColumnsType = [
    {
      title: "№",
      dataIndex: `index`,
      key: `index`,
      width: 10,
      render: (value, record: any, index) => (
        <div className="indexWrapper">{index + 1}</div>
      ),
    },
    {
      title: "Hodisa",
      dataIndex: `text`,
      key: `text`,
      width: 60,
      render: (value) => (
        <div onClick={() => setVisible(true)}> {checkValueEmpty(value)} </div>
      ),
    },
    {
      title: "Sana",
      dataIndex: `created_time`,
      key: `created_time`,
      width: 10,

      render: (value, record: any) => (
        <div>{moment(value).format("DD MMMM YYYY - HH:mm")}</div>
      ),
    },
    {
      title: "Hodisa muallifi",
      dataIndex: `employee`,
      key: `employee`,
      width: 10,

    },
    {
      title: "Telefon raqam",
      dataIndex: `phone_number`,
      key: `phone_number`,
      width: 10,

      render: () => <div>number</div>,
    },
  ];

  return <Table columns={columns} dataSource={data || []} pagination={false} />;
};

export default StudentHistoryMesseges;
