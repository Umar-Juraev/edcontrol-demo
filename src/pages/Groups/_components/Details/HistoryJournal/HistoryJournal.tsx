import { useState } from "react";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";

import { TableColumnsType } from "antd";
import { Table } from "components/shared";
import { useGroupByIdQuery } from "store/endpoints";

import classes from "./HistoryJournal.module.scss";

const HistoryJournal = () => {
  const [page, setPage] = useState(1)
  const { id } = useParams<{ id: any }>();

  const groupByIdQuery = useGroupByIdQuery({ id });
  
  const columns: TableColumnsType = [
    {
      title: `№`,
      dataIndex: `id`,
      key: `id`,
      render: (value, record, index) => (
        <div className={classes.indexButton}>{(page - 1) * 10 + index + 1}</div>
      )
    },
    {
      title: `Hodisa nomi`,
      dataIndex: `text`,
      key: `text`,
      width: `50%`,
      render: (value) => <div dangerouslySetInnerHTML={{ __html: value.split('.')[0] }}  />
    },
    {
      title: `Vaqti`,
      dataIndex: `created_time`,
      key: `created_time`,
      render: (value, record: any) => moment(value).format("DD MMMM YYYY - HH:mm")
    },
    {
      title: `Muallif`,
      dataIndex: `employee`,
      key: `employee`
    }
  ];

  return (
    <>
      <Table
        columns={columns}
        loading={groupByIdQuery.isFetching}
        dataSource={groupByIdQuery.data?.logs || []}
        scroll={{ x: 780 }}
        pagination={{
          total: groupByIdQuery.data?.logs.length,
          pageSize: 10,
          current: page,
          onChange: (e) => setPage(e)
        }}
      />
    </>
  );
};

export default HistoryJournal;
