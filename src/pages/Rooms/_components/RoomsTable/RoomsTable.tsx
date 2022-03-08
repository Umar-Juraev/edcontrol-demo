import React, { FC, useEffect, useState } from "react";
import { Col, Row, TableColumnsType } from "antd";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { Button, Table, PopConfirm, Pagination } from "components/shared";

import UpdateRoomModal from "../UpdateRoomModal";
import CreateRoomModal from "../CreateRoomModal";

import classes from "./RoomsTable.module.scss";
import { useAppSelector } from "store/hooks";

export type Props = {
  createRoom: boolean;
  setCreateRoom: (e: boolean) => void;
};

const Payment: FC<Props> = ({ createRoom, setCreateRoom }) => {
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [page, setPage] = useState(1);
  const history = useHistory()

  const { currentUser } = useAppSelector(state => state.persistedData)
  const SUPER_USER = currentUser.data?.role == 1000
  const CEO = currentUser.data?.role == 999

  // const roomsQuery = useRoomsQuery({ page })

  function onChange(page: number) {
    setPage(page)
    history.push(`/admin/rooms?page=${page}`)
  }


  const onEdit = (record: any) => {
    setUpdateModal(true)
    setSelectedRoom(record)
  }




  const columns: TableColumnsType = [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      render: (value, record, index) => <div>{(page - 1) * 10 + index + 1}</div>,
    },
    {
      title: "Xona nomi",
      dataIndex: "name",
      key: "name",
      render: (value, record: any) => (
        <Row align="middle" gutter={20}>
          <Col>
            <img
              src={record?.photo?.file ?? "https://www.lottehotel.com/content/dam/lotte-hotel/lotte/world/facilities/business/180706-2-2000-fac-world-hotel.jpg.thumb.1920.1920.jpg"}
              alt=""
              className={classes.image}
            />
          </Col>
          <Col>{value}</Col>
        </Row>
      )
    },
    {
      title: "Xona sig'imi",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Filial",
      dataIndex: ["branch", "name"],
      key: "capacity",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (value, record) => (
        <Row justify="space-between" gutter={10}>
          <Col span={12}>
            <Button
              fullWidth
              size="large"
              type="ghost"
              onClick={() => onEdit(record)}
            >
              O'zgartirish
            </Button>
          </Col>
          {(CEO || SUPER_USER) &&  (
            <Col span={12}>
              <PopConfirm title="Xona o'chirilsinmi?" >
                <Button size="large" danger fullWidth>O'chirish</Button>
              </PopConfirm>
            </Col>
          )}
        </Row>
      )
    },
  ];

  return (
    <div >
      {/* <Table
        columns={columns}
        dataSource={roomsQuery.data?.results}
        pagination={false}
        scroll={{ x:  680 }}
        loading={roomsQuery.isFetching}
      /> */}

      <CreateRoomModal
        visible={createRoom}
        setVisible={setCreateRoom}
      />

      <UpdateRoomModal
        visible={updateModal}
        setVisible={setUpdateModal}
        data={selectedRoom}
      />

      <Row justify="end" >
        {/* <Pagination
          total={roomsQuery.data?.count}
          pageSize={10}
          current={page}
          onChange={onChange}
        /> */}
      </Row>
    </div>
  );
};

export default Payment;
