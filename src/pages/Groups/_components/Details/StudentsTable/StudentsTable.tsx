import React, { FC, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Col, Popconfirm, Row, TableColumnsType } from "antd";

import { separateNumberThousands, separatePhoneNumber } from "utils";
import { Button, Table } from "components/shared";
import PaymentModal from "../PaymentModal";
import Point from "images/more-outline.svg";

import classes from "./StudentsTable.module.scss";

export type Props = {};

const StudentsTable: FC<Props> = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any>();

  const { id } = useParams<{ id: any }>();

  // const pupilsQuery = usePupilsFullQuery({ group: id })



  const columns: TableColumnsType = [
    {
      dataIndex: [`user`, `full_name`],
      key: `full_name`,
      render: (value, record: any) => {
        return (
          <Link to={`/admin/students/${record?.user.id}`}>
            <Row align="middle" gutter={20}>
              <Col>
                <img
                  src={record.user.photo?.file ?? "https://www.lottehotel.com/content/dam/lotte-hotel/lotte/world/facilities/business/180706-2-2000-fac-world-hotel.jpg.thumb.1920.1920.jpg"}
                  alt=""
                  className={classes.image}
                />
              </Col>
              <Col>{value}</Col>
            </Row>
          </Link>
        )
      }
    },
    {
      dataIndex: [`user`, `phone_number`],
      key: `phone_number`,
      render: (value) => separatePhoneNumber(value)
    },

    {
      dataIndex: [`user`, `balance`],
      key: `balance`,
      render: (value) => (
        value < 0 ? (
          <Button danger disabled >
            {separateNumberThousands(value)} so'm
          </Button>
        ) : (
          <Button type="ghost" disabled >
            {separateNumberThousands(value)} so'm
          </Button>
        )
      ),
    },

    {
      dataIndex: `user`,
      key: `user`,
      render: (value, record: unknown) => (
        <Row align="middle" gutter={10} onClick={() => setSelectedUser(record)}>
          <Col span={10}>
            <Button
              fullWidth
              size="large"
              className={classes.button}
              onClick={() => setVisible(true)}
            >
              Hisobni to'ldirish
            </Button>
          </Col>

          <Col span={10}>
            <Popconfirm
              title="Ushbu o'quvchi guruhdan olib tashlansinmi?"
              placement="topRight"
            >
              <Button
                fullWidth
                size="large"
                className={`${classes.button} ${classes.deleteButton}`}
              >
                O'chirish
              </Button>
            </Popconfirm>
          </Col>

          <Col span={4}>
            <Button
              size="large"
              className={`${classes.button} ${classes.pointButton}`}
            >
              <img src={Point} alt="" />
            </Button>
          </Col>
        </Row >
      ),
    },
  ];

  return (
    <div>
      {/* <Table
        columns={columns}
        dataSource={pupilsQuery.data?.filter((pupil) => !pupil.user.is_removed) || []}
        noHead
        loading={pupilsQuery.isFetching}
        scroll={{ x: 960 }}
        pagination={false}
      />
      <PaymentModal
        visible={visible}
        setVisible={setVisible}
        user={selectedUser?.user}
      /> */}
    </div>
  );
};

export default StudentsTable;