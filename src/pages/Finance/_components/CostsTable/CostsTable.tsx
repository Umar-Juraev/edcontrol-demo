import { FC, useEffect, useState } from "react";
import { TableColumnsType } from "antd";
import moment from "moment";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

import { Button, PopConfirm, Table } from "components/shared";
import { DeleteIcon } from "components/svg";
import { useDeleteOutcomeMutation, useOutcomesQuery } from "store/endpoints";
import {
  checkObjectValueExist,
  checkValueEmpty,
  separateNumberThousands,
} from "utils";
import CreateCostModal from "../CreateCostModal";
import CostsFilterModal from "../CostsFilterModal";

import classes from "../../Finance.module.scss";
import { useAppSelector } from "store/hooks";

export type Props = {
  createCost: boolean;
  setCreateCost: (e: boolean) => void;
};

const CostsTable: FC<Props> = ({ createCost, setCreateCost }) => {
  const [page, setPage] = useState(1);
  const history = useHistory();
  const {
    finances: { costsStates },
    persistedData: { currentUser },
  } = useAppSelector((state) => state);
  const SUPER_USER = currentUser.data?.role == 1000;
  const CEO = currentUser.data?.role == 999;

  const queryKeys = {
    page,
    reason: costsStates.reason,
    employee: costsStates.employee,
    created_time__gte: costsStates.startDate,
    created_time__lte: costsStates.endDate,
  };
  checkObjectValueExist(queryKeys);

  const outcomesQuery = useOutcomesQuery(queryKeys);
  const [deleteMutation] = useDeleteOutcomeMutation();

  function onChange(page: number) {
    setPage(page);
    history.push(`/admin/finance?type=outcome&page=${page}`);
  }

  const onDelete = (record: any) => {
    const mutationPromise = deleteMutation({ id: record.id }).unwrap();
    toast.promise(mutationPromise, {
      loading: `o'chirilmoqda...`,
      success: `muvaffaqiyatli o'chirildi`,
      error: ({ data }) => JSON.stringify(data),
    });
  };

  const columns: TableColumnsType = [
    {
      title: "№",
      dataIndex: `id`,
      key: `id`
    },
    {
      title: "Nomi",
      dataIndex: `name`,
      key: `name`,
      render: (value) => checkValueEmpty(value),
    },
    {
      title: "Summa",
      dataIndex: `amount`,
      key: `amount`,
      render: (value) => (
        <div style={{ color: "#FF4F37" }}>{`-${separateNumberThousands(
          value
        )} so'm`}</div>
      ),
    },
    {
      title: "Sana",
      dataIndex: `created_time`,
      key: `created_time`,
      render: (value) => (
        <div>{moment(value).format("DD MMMM YYYY - HH:mm")}</div>
      ),
    },
    {
      title: "Sabab",
      dataIndex: [`reason`, `name`],
      key: `reason`,
      render: (value) => checkValueEmpty(value),
    },
    {
      title: "Xodim",
      dataIndex: [`employee`, `full_name`],
      key: `employee`,
      render: (value) => checkValueEmpty(value),
    },
    {
      title: "Izoh",
      dataIndex: `comment`,
      key: `comment`,
      render: (value) => checkValueEmpty(value),
    },
    {
      title: "",
      dataIndex: `action`,
      key: `action`,
      render: (value, record) => (
        <>
          {(CEO || SUPER_USER) && (
            <PopConfirm
              title="Xarajat o'chirilsinmi?"
              onConfirm={() => onDelete(record)}
            >
              <Button icon={<DeleteIcon />} className={classes.deleteButton} />
            </PopConfirm>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={outcomesQuery.data?.results || []}
        loading={outcomesQuery.isFetching}
        pagination={{
          total: outcomesQuery.data?.count,
          pageSize: 10,
          current: page,
          onChange: (e) => onChange(e),
        }}
      />
      <CreateCostModal visible={createCost} setVisible={setCreateCost} />

      <CostsFilterModal />
    </div>
  );
};

export default CostsTable;
