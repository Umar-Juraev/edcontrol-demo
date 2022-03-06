import React, { FC } from "react";
import moment from "moment";
import { Col, TableColumnsType } from "antd";

import { Badge, Modal, Table } from "components/shared";
import { useAppSelector } from "store/hooks";
import { useClientsByIdQuery } from "store/endpoints";

import classes from "./HistoryModal.module.scss";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const HistoryModal: FC<Props> = ({ visible, setVisible }) => {
  const { clientId } = useAppSelector((state) => state.idSlicesRoot);

  const { data, isFetching } = useClientsByIdQuery({ id: clientId });

  const columns: TableColumnsType = [
    {
      title: "Status",
      dataIndex: `text`,
      key: `text`,
      render: (value, record: any) => {
        return (
          <Col>
            <Badge type="round" text={value} />
          </Col>
        );
      },
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
      title: "Mijoz ismi",
      dataIndex: `full_name`,
      key: `full_name`,
      render: () => <div>{data?.full_name}</div>,
    },
  ];

  return (
    <Modal
      title="Status tarixi"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >

      <Table
        columns={columns}
        dataSource={data?.logs || []}
        loading={isFetching}
        pagination={false}
      />
    </Modal>
  );
};

export default HistoryModal;
