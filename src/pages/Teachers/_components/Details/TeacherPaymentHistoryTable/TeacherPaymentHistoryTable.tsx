import { FC, useState } from "react";
import { TableColumnsType } from "antd";
import { useParams } from "react-router-dom";

import { PaymentsDTO } from "types"
import { Table } from "components/shared";
import { useTeacherSalariesQuery } from "store/endpoints"
import { separateNumberThousands } from "utils";
import moment from "moment";

export type Props = {
  data?: PaymentsDTO[];
};

const TeacherPaymentHistoryTable: FC<Props> = ({ data }) => {
  const [page, setPage] = useState(1)
  const { id } = useParams<{ id: any }>()

  const teacherSalariesQuery = useTeacherSalariesQuery({
    date_from: moment().subtract(1, 'year').format('YYYY-MM-DD'),
    date_to: moment().format('YYYY-MM-DD')
  })

  function onChange(page: number) {
    setPage(page)
  }

  const columns: TableColumnsType = [
    {
      title: '№',
      dataIndex: `id`,
      key: `id`,
      render: (value, record, index) => <div>{(page - 1) * 10 + index + 1}</div>,
    },
    {
      title: 'Talabalar',
      dataIndex: `students_count`,
      key: `students_count`,
      render: (value) => <div>{value} talabalar</div>
    },
    {
      title: 'Darslar',
      dataIndex: `lessons_count`,
      key: `lessons_count`,
      render: (value) => <div>{value} darslar</div>
    },
    {
      title: "Summa",
      dataIndex: `salary`,
      key: `salary`,
      render: (value) => <div style={{ color: '#FF4F37' }}>{`${separateNumberThousands(value)} so'm`}</div>,
    },
    {
      title: "Guruhdan tushgan summa",
      dataIndex: `salary_from_group`,
      key: `salary_from_group`,
      render: (value) => <div>{`${separateNumberThousands(value)} so'm`}</div>,
    },
    {
      title: "Har bir talabadan tushgan summa",
      dataIndex: `salary_from_every_students_pay`,
      key: `salary_from_every_students_pay`,
      render: (value) => <div>{`${separateNumberThousands(value)} so'm`}</div>,
    },
    {
      title: "Umumiy ish haqi",
      dataIndex: `total_salary`,
      key: `total_salary`,
      render: (value) => <div style={{ color: '#377DFF' }}>{`${separateNumberThousands(value)} so'm`}</div>,
    },
  ];

  const filteredData = teacherSalariesQuery.data?.filter(item => item.teacher_id == id)

  return (
    <div>
      <Table
        columns={columns}
        dataSource={filteredData || []}
        loading={teacherSalariesQuery.isFetching}
        pagination={{
          total: filteredData?.length,
          pageSize: 10,
          current: page,
          onChange: (e) => onChange(e),
          showSizeChanger: false
        }}
      />
    </div>
  );
};

export default TeacherPaymentHistoryTable;
