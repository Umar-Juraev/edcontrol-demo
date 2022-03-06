import { FC, useEffect, useState } from "react";
import { TableColumnsType } from "antd";
import { useHistory } from "react-router-dom";

import { Table } from "components/shared";
import { useTeacherSalariesQuery } from "store/endpoints";
import { checkValueEmpty, separateNumberThousands } from "utils";
import { useAppSelector } from "store/hooks";
import CalculatorModal from "../CalculatorModal";

export type Props = {};

const SalariesTable: FC<Props> = () => {
  const [page, setPage] = useState(1)
  const history = useHistory()
  const { salaryStates } = useAppSelector(state => state.finances)

  const teacherSalariesQuery = useTeacherSalariesQuery({
    date_from: salaryStates.startDate,
    date_to: salaryStates.endDate
  })

  function onChange(page: number) {
    setPage(page)
    history.push(`/admin/finance?type=salaries&page=${page}`)
  }

  const columns: TableColumnsType = [
    {
      title: '№',
      dataIndex: `id`,
      key: `id`,
      render: (value, record, index) => <div>{(page - 1) * 10 + index + 1}</div>,
    },
    {
      title: `O'qituvchi`,
      dataIndex: `teacher`,
      key: `teacher`
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

  return (
    <div>
      <Table
        columns={columns}
        dataSource={teacherSalariesQuery.data || []}
        loading={teacherSalariesQuery.isFetching}
        scroll={{ x:  1200 }}
        pagination={{
          total: teacherSalariesQuery.data?.length,
          pageSize: 10,
          current: page,
          onChange: (e) => onChange(e),
          showSizeChanger: false
        }}
      />

      <CalculatorModal />
    </div>
  );
};

export default SalariesTable;
