import { FC } from "react";
import moment from "moment";
import { Row, TableColumnsType } from "antd";
import { useParams } from "react-router-dom";

import toast from "react-hot-toast";

import { Tooltip, Table, PopConfirm } from "components/shared";
import { checkValueEmpty, separateNumberThousands } from "utils";
import { PrintIcon, UndoIcon } from "components/svg";
import { useAppSelector } from "store/hooks";

export type Props = {
  setVisible: (bool: boolean) => void;
};

const StudentPaymentTable: FC<Props> = ({ setVisible }) => {
  const { id } = useParams<{ id: any }>();
  const { currentUser } = useAppSelector(state => state.persistedData)
  const SUPER_USER = currentUser.data?.role == 1000
  const CEO = currentUser.data?.role == 999

  // const paymentsQuery = usePaymentsQuery({ user: id });



  const columns: TableColumnsType = [
    {
      title: "№",
      dataIndex: `id`,
      key: `id`,
    },
    {
      title: "To'lov nomi",
      dataIndex: `logs`,
      key: `logs`,
      render: (value) => <div dangerouslySetInnerHTML={{ __html: value[0].text.split('.')[0] }} />
    },
    {
      title: "Summa",
      dataIndex: `amount`,
      key: `amount`,
      render: (value) => <div>{`${separateNumberThousands(value)} so'm`}</div>,
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
      title: "To'lov turi",
      dataIndex: [`provider`, `name`],
      key: `provider`
    },
    {
      title: "Xodim",
      dataIndex: [`employee`, `full_name`],
      render: (value, record: any) => <div>{record.logs?.[0]?.employee}</div>
    },
    {
      title: "Izoh",
      dataIndex: `comment`,
      key: `comment`,
      render: (value) => (
        <Tooltip title={"Batafsil"}>
          <div onClick={() => setVisible(true)}>{checkValueEmpty(value)}</div>
        </Tooltip>
      ),
    },
    {
      title: ``,
      dataIndex: `action`,
      key: `action`,
      render: (value, record: any) => (
        <Row gutter={8} wrap={false}>
          <Tooltip title={"Chop etish"}>
            <div className="tooltipIconBg">
              <PrintIcon />
            </div>
          </Tooltip>
          {(CEO || SUPER_USER) && <Tooltip title={!record.is_canceled ? "Bekor qilish" : "To'lov bekor qilingan"} >
            <PopConfirm
              disabled={record.is_canceled}
              title="Haqiqatan ham toʻlovni bekor qilmoqchimisiz?"
             
            >
              <div className={`tooltipIconBg undo ${record.is_canceled && 'canceled'}`} >
                <UndoIcon />
              </div>
            </PopConfirm>
          </Tooltip>
          }
        </Row>
      ),
    },
  ];

  return (
    <div>
      {/* <Table
        columns={columns}
        loading={paymentsQuery.isLoading}
        dataSource={paymentsQuery.data?.results || []}
        pagination={false}
        rowClassName={(record) => record.is_canceled && 'danger-table-row'}
      /> */}
    </div>
  );
};

export default StudentPaymentTable;
