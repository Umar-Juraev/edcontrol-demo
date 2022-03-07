import { FC, useEffect, useState } from "react";
import moment from "moment";
import toast from "react-hot-toast";
import Slider from "react-slick";
import { Col, Row, TableColumnsType } from "antd";
import { useHistory } from "react-router-dom";

import { Table, Badge, PopConfirm, Button } from "components/shared";
import { checkObjectValueExist, separatePhoneNumber } from "utils";
import { setClientId } from "store/slices/getId";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { ThreeDotsIcon } from "components/svg";
import HistoryModal from "../HistoryModal";

import classes from "../../Clients.module.scss";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface Props {
  setVisible: (bool: boolean) => void;
  setSelectedClient: any
}

const ClientTable: FC<Props> = ({ setVisible, setSelectedClient }) => {
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState(0);
  const [page, setPage] = useState(1);
  const [historyModal, setHistoryModal] = useState(false);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { clients } = useAppSelector((state) => state.clientFilter);

  const queryKeys = {
    page,
    course__direction: clients.direction,
    source: clients.source,
    status: clients.status,
    // date_add_start: moment(clients.date_add_start).format("DD-MMMM-YYYY"),
    // date_add_end: moment(clients.date_add_end).format("DD-MMMM-YYYY"),
  };
  checkObjectValueExist(queryKeys);

  const queryStatus = active ? status : "";
  // const clientsQuery = useClientsQuery({ page, status: queryStatus });
  // const full = useClientsFullQuery();
  // const statusesQuery = useStatusesQuery();

  // const [updateClientMutation, { isLoading }] = useUpdateClientMutation();

  // useEffect(() => {
  //   clientsQuery.refetch();
  // }, [clients]);

  function onChange(page: number) {
    setPage(page);
    history.push(`/admin/clients?page=${page}`);
  }

  // const onUpdate = (values: any, id: number) => {
  //   const clientValues = {
  //     branch: values.branch.id,
  //     full_name: values.full_name,
  //     phone_number: values.phone_number,
  //     direction: values.direction.id,
  //     source: values.source.id,
  //     status: id,
  //   };
  //   checkObjectValueExist({ clientValues });

  //   const mutationPromise = updateClientMutation({
  //     id: values.id,
  //     ...clientValues,
  //   }).unwrap();

  //   toast.promise(mutationPromise, {
  //     loading: `yangilanmoqda...`,
  //     success: `muvaffaqiyatli yangilandi`,
  //     error: ({ data }) => JSON.stringify(data),
  //   });
  // };

  const handleClick = (id: any) => {
    setHistoryModal(true);
    dispatch(setClientId(id));
  };

  const handleOpenCreateModal = (data: any) => {
    setVisible(true)
    setSelectedClient(data)
  }

  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 100,
    slidesToShow: 7,
    slidesToScroll: 4,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const columns: TableColumnsType = [
    {
      title: "№",
      dataIndex: `id`,
      key: `id`,
      render: (value, record, index) => (
        <Row gutter={20} align="middle" wrap={false}>
          <Col>{(page - 1) * 10 + index + 1}</Col>
          <Col>
            <Badge status="success" />
          </Col>
        </Row>
      ),
    },
    {
      title: "Mijoz ismi",
      dataIndex: `full_name`,
      key: `full_name`,
    },
    {
      title: "Telefon raqam",
      dataIndex: `phone_number`,
      key: `phone_number`,
      render: (value) => <div>{separatePhoneNumber(value)}</div>,
    },

    {
      title: "Manba",
      dataIndex: [`source`, `name`],
      key: `source`,
    },
    {
      title: "Yo'nalish",
      dataIndex: [`direction`, `name`],
      key: `direction`,
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
      title: "Status",
      dataIndex: [`status`, `name`],
      key: `status`,
      render: (value, record: any) => {
        return (
          <Row align="middle" justify="space-between" wrap={false}>
            <PopConfirm
              placement="bottomRight"
              icon={false}
              okButtonProps={{ hidden: true }}
              cancelButtonProps={{ hidden: true }}
              overlayInnerStyle={{
                maxHeight: "50vh",
                overflow: "scroll",
              }}
              title={
                <Col>
                  {/* {statusesQuery.data?.slice(0, -1).map((item) => {
                    return (
                      <Col
                        key={item.id}
                        onClick={() => onUpdate(record, item.id)}
                      >
                        <Button className="popButton">{item.name}</Button>
                      </Col>
                    );
                  })} */}
                </Col>
              }
            >
              <Badge type="round" text={value} />
            </PopConfirm>

            <PopConfirm
              placement="bottomRight"
              icon={false}
              okButtonProps={{ hidden: true }}
              cancelButtonProps={{ hidden: true }}
              overlayInnerStyle={{
                maxHeight: "50vh",
                overflow: "scroll",
                width: 265
              }}
              title={
                <>
                  <Button onClick={() => handleClick(record.id)} className="popButton" >
                    Status tarixi
                  </Button>
                  <Button onClick={() => handleOpenCreateModal(record)} className="popButton">
                    Talabaga aylantirish
                  </Button></>
              }
            >
              <Button
                size="large"
                singleIconMode
                icon={<ThreeDotsIcon />}
                className={classes.pointButton}
              />
            </PopConfirm>
          </Row>
        );
      },
    },
  ];

  return (
    <section className={classes.section}>
      <Slider {...settings}>
        {/* {statusesQuery.data?.slice(0, -1).map((item) => (
          <Badge
            key={item.id}
            text={item.name}
            style={{ width: "auto" }}
            active={active && status === item.id}
            onClick={() => {
              status === item.id && active
                ? setActive(!active)
                : setActive(true);
              setStatus(item.id);
            }}
          />
        ))} */}
      </Slider>
      <br />
      <Table
        columns={columns}
        // dataSource={clientsQuery.data?.results.filter(item => item.status.name !== 'Student') || []}
        // loading={clientsQuery.isFetching}
        scroll={{ x: 980 }}
        pagination={{
          // total: clientsQuery.data?.count,
          pageSize: 10,
          current: page,
          onChange: (e) => onChange(e),
        }}
      />

      <HistoryModal visible={historyModal} setVisible={setHistoryModal} />
    </section>
  );
};

export default ClientTable;
