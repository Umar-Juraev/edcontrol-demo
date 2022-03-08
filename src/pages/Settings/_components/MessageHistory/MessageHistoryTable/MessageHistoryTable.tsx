import { FC } from "react";
import { TableColumnsType } from "antd";
import moment from "moment";
import { useHistory } from "react-router-dom";

import { Button, Table } from "components/shared";
import { checkValueEmpty, separatePhoneNumber } from "utils";
import { ReadMoreIcon } from "components/svg";
import { postsAPI } from "fakeAPI/fakeAPI";

export type Props = {};

const CostsTable: FC<Props> = () => {
  const history = useHistory()

  const columns: TableColumnsType = [
    {
      title: '№',
      dataIndex: `id`,
      key: `id`,
      render: ( index) => <div> {index} </div>,
    },
    {
      title: 'Xabar',
      dataIndex: `text`,
      key: `text`,
      width: '30%',
      render: (value) => checkValueEmpty(value)
    },
    {
      title: "Talaba",
      dataIndex: [`student`, `full_name`],
      key: `full_name`,
    },
    {
      title: 'Telefon raqami',
      dataIndex: `student`,
      key: `student`,
      render: (value) => {
        return (<div>
          {separatePhoneNumber(value.phone_number)}
        </div>)
      }
    },
    {
      title: "Xodim",
      dataIndex: `employee`,
      key: `employee`,
    },
    {
      title: "Status",
      dataIndex: `status`,
      key: `status`,
    },
    {
      title: "Qo'shilgan Sana",
      dataIndex: `created_time`,
      key: `created_time`,
      render: (value) => (
        <div>{moment(value).format("DD MMMM YYYY - HH:mm")}</div>
      ),
    },

    {
      title: '',
      dataIndex: `other`,
      key: `other`,
      width: `7%`,
      render: () => (
        <Button
          icon={<ReadMoreIcon />}
          singleIconMode
          size="large"
          onClick={() => history.push(`/admin/settings/student-messages`)}
        />
      )
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={postsAPI.results || []}
        pagination={{
          total: postsAPI.count,
          pageSize: 10,
          current: 1,
        }}
      />
    </div>
  );
};

export default CostsTable;
