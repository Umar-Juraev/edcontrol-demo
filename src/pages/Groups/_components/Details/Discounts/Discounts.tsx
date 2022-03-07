import { FC, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { TableColumnsType, Row, Col } from "antd";

import { separatePhoneNumber } from "utils";
import { Table, Button } from "components/shared";
import { Input } from "components/shared/FormElements";
import { MoneysIcon } from "components/svg";

import classes from "./Discounts.module.scss";

type Props = {};

const Discounts: FC<Props> = () => {
  const [input, setInput] = useState<number>()
  const { id } = useParams<{ id: any }>();

  // const pupilsQuery = usePupilsFullQuery({ group: id })

  const columns: TableColumnsType = [
    {
      dataIndex: [`user`, `full_name`],
      title: "Talaba",
      key: `full_name`,
      width: "12%",
      render: (value, record: any) => (
        <Row align="middle" gutter={20}>
          <Col>
            <img
              src={
                record.user.photo?.file ??
                "https://www.lottehotel.com/content/dam/lotte-hotel/lotte/world/facilities/business/180706-2-2000-fac-world-hotel.jpg.thumb.1920.1920.jpg"
              }
              alt=""
              className={classes.image}
            />
          </Col>
          <Col>{value}</Col>
        </Row>
      ),
    },
    {
      title: "Telefon raqami",
      dataIndex: [`user`, `phone_number`],
      key: `phone_number`,
      width: "10%",
      render: (value) => separatePhoneNumber(value),
    },

    {
      title: "Individual narx",
      dataIndex: [`user`, `balance`],
      key: `balance`,
      width: "15%",
      render: (value, record: any) => (
        <Input
          placeholder="Shaxsiy narxni kiriting"
          defaultValue={record.discount_price || null}
          onChange={(e) => setInput(+e.target.value)}
          suffix={< MoneysIcon />}
        />
      ),
    },
    {
      dataIndex: [`user`, `balance`],
      key: `balance`,
      width: "8%",
      render: (value, record: any) => (
        <Button
          type="ghost"
          className={classes.save_btn}
        >
          Saqlash
        </Button>
      ),
    },
  ];
  return (
    <div>
      {/* <Table
        columns={columns}
        loading={pupilsQuery.isFetching}
        dataSource={pupilsQuery.data || []}
        scroll={{ x: 960 }}
        pagination={false}
      /> */}
    </div>
  );
};

export default Discounts;
