import { FC } from "react";
import moment from "moment";
import { TableColumnsType } from "antd";
import { Link, useLocation, useParams } from "react-router-dom";

import { Table } from "components/shared";
import { useMaterialsQuery } from "store/endpoints/materials";
import { LeftArrowIcon } from "components/svg";
import { CoursesDTO } from "types";

import classes from "./Materials.module.scss";

type Props = {
  course?: CoursesDTO;
};

const Materials: FC<Props> = ({ course }) => {
  const { id } = useParams<{ id: any }>();
  const { pathname } = useLocation();
  const materialsQuery = useMaterialsQuery({ course: course?.id });

  const columns: TableColumnsType = [
    {
      title: `№`,
      dataIndex: `index`,
      key: `index`,
      width: "5%",
      fixed: `left`,
      render: (value, record: any) => (
        <div className={classes.index}>{record.course}</div>
      ),
    },
    {
      title: `Material nomi`,
      dataIndex: `material_name`,
      key: `material_name`,
      width: "30%",
      fixed: `left`,
      render: (value, record: any) => <div>{record.title}</div>,
    },
    {
      title: `Qo'shilgan sana`,
      dataIndex: `date_added`,
      key: `date_added`,
      width: "35%",
      fixed: `left`,
      render: (value, record: any) => (
        <div>{moment(record.created_time).format("DD MMMM YYYY - HH:mm")}</div>
      ),
    },
    {
      title: ``,
      dataIndex: `more`,
      key: `more`,
      width: "5%",
      fixed: `left`,
      render: (value, record: any) => (
        <Link
          to={
            pathname.includes(`settings/course`)
              ? `/admin/settings/course/${course?.id}/materials/${record.id}`
              : `/admin/groups/${id}/materials/${record.id}`
          }
        >
          <LeftArrowIcon />
        </Link>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        loading={materialsQuery.isLoading}
        scroll={{ x: 960 }}
        dataSource={materialsQuery.data?.results || []}
      />
    </>
  );
};

export default Materials;
