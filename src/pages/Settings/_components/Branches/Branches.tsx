import { useState } from "react";
import { TableColumnsType, Row, Col } from "antd";
import toast from "react-hot-toast";

import { checkValueEmpty, separatePhoneNumber } from "utils";
import { useAppSelector } from "store/hooks";
import { Button, PopConfirm, Table } from "components/shared";
import UpdateBranchModal from "../UpdateBranchModal";

import classes from '../../Settings.module.scss'

const Branches = () => {
  const [page, setPage] = useState(1);
  const [updateModal, setUpdateModal] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState()

  const { currentUser } = useAppSelector(state => state.persistedData)
  const SUPER_USER = currentUser.data?.role == 1000
  const CEO = currentUser.data?.role == 999


  function onChange(page: number) {
    setPage(page);
  }

  const onDelete = (record: any) => {

  };

  const columns: TableColumnsType = [
    {
      title: "№",
      dataIndex: `id`,
      key: `id`,
      width: "5%",
      render: (value, record, index) => (
        <div>{(page - 1) * 10 + index + 1}</div>
      ),
    },
    {
      title: "Filial nomi",
      dataIndex: `name`,
      key: `name`,
      render: (value, record: any) => (
        <Row align="middle" gutter={20}>
          <Col>
            <img
              src={
                record.photo?.file ??
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
      title: "Telefon raqam",
      dataIndex: `phone_number`,
      key: `phone_number`,
      render: (value) => <div>{value.includes('998') ? separatePhoneNumber(value) : checkValueEmpty(null)}</div>
    },
    {
      title: "",
      dataIndex: `other`,
      key: `other`,
      align: 'right',
      render: (value, record: any) => (
        <Row align="middle" justify="end" gutter={20} >
          <Col>
            <Button singleIconMode size="large">
              Xaritadagi manzil
            </Button>
          </Col>

          <Col>
            <Button
              singleIconMode
              size="large"
              onClick={() => {
                setSelectedBranch(record)
                setUpdateModal(true)
              }}
            >
              O'zgartirish
            </Button>
          </Col>

          <Col>
            {(CEO || SUPER_USER) && 
              <PopConfirm
                title="are you sure you want to delete it?"
                onConfirm={() => onDelete(record)}
              >
                <Button singleIconMode size="large">
                  O'chirish
                </Button>
              </PopConfirm>
            }
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <div>
      {/* <Table
        columns={columns}
        dataSource={branchQuery.data?.results || []}
        loading={branchQuery.isFetching}
        scroll={{ x: 840 }}
        pagination={{
          total: branchQuery.data?.count,
          pageSize: 10,
          current: page,
          onChange: (e) => onChange(e),
        }}
      /> */}

      <UpdateBranchModal
        visible={updateModal}
        setVisible={setUpdateModal}
       
      />
    </div>
  );
};

export default Branches;
