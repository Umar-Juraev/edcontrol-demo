import { FC, useState } from "react";
import { TableColumnsType } from "antd";
import moment from "moment";
import { useHistory } from "react-router-dom";

import { Button, Table } from "components/shared";
import { usePostsQuery } from "store/endpoints";
import { checkValueEmpty, separatePhoneNumber } from "utils";
import { ReadMoreIcon } from "components/svg";

export type Props = {};

const CostsTable: FC<Props> = () => {
  const [page, setPage] = useState(1)
  const history = useHistory()

  const currentParams = history.location.search?.split('&')
  const tabParams = currentParams[0]?.split("=")[1];

  const postsQuery = usePostsQuery({ page })

  function onChange(page: number) {
    setPage(page)
    history.push(`/admin/settings?tab=${tabParams}&page=${page}`);
  }
  const columns: TableColumnsType = [
    {
      title: '№',
      dataIndex: `id`,
      key: `id`,
      render: (value, record, index) => <div>{(page - 1) * 10 + index + 1}</div>,
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
      render: (value) => (
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
        dataSource={postsQuery.data?.results || []}
        loading={postsQuery.isFetching}
        pagination={{
          total: postsQuery.data?.count,
          pageSize: 10,
          current: page,
          onChange: (e) => onChange(e)
        }}
      />
    </div>
  );
};

export default CostsTable;
