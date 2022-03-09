import { FC, useState } from "react";
import { Row, TableColumnsType } from "antd";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";

import { PopConfirm, Table, Tooltip } from "components/shared";
import { checkObjectValueExist, checkValueEmpty, separateNumberThousands } from "utils";
import { useAppSelector } from "store/hooks";
import { PrintIcon, UndoIcon } from "components/svg";
import PaymentsFilterModal from "../PaymentsFilterModal";
import PaymentUpdateModal from "../PaymentUpdateModal";
import { paymentsAPI } from "fakeAPI/fakeAPI";

export type Props = {};

const PaymentsTable: FC<Props> = () => {
  const [page, setPage] = useState(1);
  const [updateModal, setUpdateModal] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState()
  const history = useHistory();

  const { currentUser } = useAppSelector(state => state.persistedData)
  const SUPER_USER = currentUser.data?.role == 1000
  const CEO = currentUser.data?.role == 999

  const { paymentStates } = useAppSelector(state => state.finances)
  const queryKeys = {
    page,
    provider: paymentStates.provider,
    by_direction: paymentStates.direction,
  }
  checkObjectValueExist(queryKeys)

  
  



  const columns: TableColumnsType = [
    {
      title: "№",
      dataIndex: `id`,
      key: `id`
    },
    {
      title: "Talaba",
      dataIndex: [`user`, `full_name`],
      key: `user`,
    },
    {
      title: "Summa",
      dataIndex: `amount`,
      key: `amount`,
      render: (value) => (
        <div style={{ color: "#086420" }}>{`+${separateNumberThousands(
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
      title: "To'lov turi",
      dataIndex: [`provider`, `name`],
      key: `provider`,
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
      render: (value) => checkValueEmpty(value)
    },
    {
      title: ``,
      dataIndex: `action`,
      key: `action`,
      render: (value, record: any) => (
        <Row gutter={8} wrap={false}>
          <Tooltip title="O'zgartirish">
            <div
              className="tooltipIconBg"
              onClick={() => {
                setSelectedPayment(record)
                setUpdateModal(true)
              }}
            >
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
          </Tooltip>}
        </Row>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={paymentsAPI.results}
        rowClassName={(record) => record.is_canceled && 'danger-table-row'}
        scroll={{ x: 765 }}
        pagination={{
          total: paymentsAPI.count,
          pageSize: 10,
          current: page,
         
          showSizeChanger: false
        }}
      />

      <PaymentsFilterModal />
      <PaymentUpdateModal
        visible={updateModal}
        setVisible={setUpdateModal}
      />
    </div>
  );
};

export default PaymentsTable;
