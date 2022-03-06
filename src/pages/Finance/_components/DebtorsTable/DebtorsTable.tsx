import { FC, useState } from "react";
import { TableColumnsType } from "antd";
import { useHistory } from "react-router-dom";

import { Table } from "components/shared";
import { useStudentsQuery } from "store/endpoints";
import { separateNumberThousands, separatePhoneNumber } from "utils";

export type Props = {};

const DebtorsTable: FC<Props> = () => {
  const [page, setPage] = useState(1)
  const history = useHistory()

  const studentsQuery = useStudentsQuery({ balance__lt: 0, page })

  const currentParams = history.location.search?.split('&')
  const tabParams = currentParams[0]?.split("=")[1];

  function onChange(page: number) {
    setPage(page)
    history.push(`/admin/finance?tab=${tabParams}&page=${page}`);
  }

  const columns: TableColumnsType = [
    {
      title: '№',
      dataIndex: `id`,
      key: `id`,
      render: (value, record, index) => <div>{(page - 1) * 10 + index + 1}</div>,
    },
    {
      title: `Talaba`,
      dataIndex: `full_name`,
      key: `full_name`
    },
    {
      title: 'Qarzdorlik miqdori',
      dataIndex: `balance`,
      key: `balance`,
      render: (value) => <div style={{ color: '#FF4F37' }}>{`${separateNumberThousands(value)} so'm`}</div>
    },
    {
      title: 'Telefon raqami',
      dataIndex: `phone_number`,
      key: `phone_number`,
      render: (value) => <div>{separatePhoneNumber(value)}</div>
    },
    {
      title: 'Manzil',
      dataIndex: [`district`, `name`],
      key: `name`
    }
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={studentsQuery.data?.results || []}
        loading={studentsQuery.isFetching}
        scroll={{ x: 646 }}
        pagination={{
          total: studentsQuery.data?.count,
          pageSize: 10,
          current: page,
          onChange: (e) => onChange(e),
          showSizeChanger: false
        }}
      />
    </div>
  );
};

export default DebtorsTable;
