import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TableColumnsType, Row, Col } from "antd";

import { Button, PopConfirm, Table, Tooltip } from "components/shared";
import { DeleteIcon, UndoIcon } from "components/svg";
import {
  useDeleteStudentMutation,
  useDeleteTeacherMutation,
  useStudentsQuery,
  useTeachersQuery,
  useUpdateStudentMutation,
  useUpdateTeacherMutation,
} from "store/endpoints";
import { separatePhoneNumber } from "utils";
import { useAppSelector } from "store/hooks";

import classes from "../../Settings.module.scss";

const UsersArchive = () => {
  const [page, setPage] = useState(1);
  const [fullArchiveUsers, setFullArchiveUsers] = useState<any[]>([]);
  const { currentUser } = useAppSelector((state) => state.persistedData);
  const SUPER_USER = currentUser.data?.role == 1000;
  const CEO = currentUser.data?.role == 999;

  const studentsQuery = useStudentsQuery({ is_removed: true });
  const teachersQuery = useTeachersQuery();

  const [updateStudentMutation] = useUpdateStudentMutation();
  const [deleteStudentMutation] = useDeleteStudentMutation();
  const [updateTeacherMutation] = useUpdateTeacherMutation();
  const [deleteTeacherMutation] = useDeleteTeacherMutation();

  useEffect(() => {
    setFullArchiveUsers([
      ...(studentsQuery.data?.results || []),
      ...(teachersQuery.data?.results.filter((item) => item.is_removed) || []),
    ]);
  }, [studentsQuery, teachersQuery]);

  function onChange(page: number) {
    setPage(page);
  }

  const onUpdate = (record: any) => {
    if ("salary" in record) {
      let mutationPromise = updateTeacherMutation({
        id: record.id,
        is_removed: false,
      }).unwrap();
      toast.promise(mutationPromise, {
        loading: `o'qituvchi arxivdan chiqarilmoqda...`,
        success: `muvaffaqiyatli arxivdan chiqarildi`,
        error: ({ data }) => JSON.stringify(data),
      });
    } else {
      let mutationPromise = updateStudentMutation({
        id: record.id,
        is_removed: false,
      }).unwrap();
      toast.promise(mutationPromise, {
        loading: `talaba arxivdan chiqarilmoqda...`,
        success: `muvaffaqiyatli arxivdan chiqarildi`,
        error: ({ data }) => JSON.stringify(data),
      });
    }
  };

  const onDelete = (record: any) => {
    if ("salary" in record) {
      let mutationPromise = deleteTeacherMutation({ id: record.id }).unwrap();
      toast.promise(mutationPromise, {
        loading: `o'qituvchi o'chirilmoqda...`,
        success: `muvaffaqiyatli o'chirildi`,
        error: ({ data }) => JSON.stringify(data),
      });
    } else {
      let mutationPromise = deleteStudentMutation({ id: record.id }).unwrap();
      toast.promise(mutationPromise, {
        loading: `talaba o'chirilmoqda...`,
        success: `muvaffaqiyatli o'chirildi`,
        error: ({ data }) => JSON.stringify(data),
      });
    }
  };

  const columns: TableColumnsType = [
    {
      title: "№",
      dataIndex: `id`,
      key: `id`,
      render: (value, record, index) => (
        <div>{(page - 1) * 10 + index + 1}</div>
      ),
    },
    {
      title: "Foydalanuvchi nomi",
      dataIndex: `full_name`,
      key: `full_name`,
      render: (value, record: any) => (
        <Row align="middle" gutter={20}>
          <Col>
            <img
              src={
                record?.photo?.file ??
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
      dataIndex: `phone_number`,
      key: `phone_number`,
      render: (value, record: any) => <div>{separatePhoneNumber(value)}</div>,
    },
    {
      title: "Foydalanuvchi roli",
      dataIndex: `user_role`,
      key: `user_role`,
      render: (value, record: any) => (
        <div>{"salary" in record ? `o'qituvchi` : `talaba`}</div>
      ),
    },

    {
      title: "",
      dataIndex: `other`,
      key: `other`,
      render: (value, record) => {
        return (
          (CEO || SUPER_USER) && (
            <Row gutter={8}>
              <Col>
                <Tooltip title="O'chirish">
                  <PopConfirm
                    title="O'chirishga ishonchingiz komilmi?"
                    onConfirm={() => onDelete(record)}
                  >
                    <Button icon={<DeleteIcon />} singleIconMode size="large" />
                  </PopConfirm>
                </Tooltip>
              </Col>
              <Col>
                <Tooltip title="Arxivdan chiqarish">
                  <PopConfirm
                    title="Foydalanuvchi arxivdan chiqarilsinmi?"
                    onConfirm={() => onUpdate(record)}
                  >
                    <Button icon={<UndoIcon />} singleIconMode size="large" />
                  </PopConfirm>
                </Tooltip>
              </Col>
            </Row>
          )
        );
      },
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={fullArchiveUsers || []}
        loading={studentsQuery.isFetching || teachersQuery.isFetching}
        scroll={{ x: 640 }}
        pagination={{
          total: fullArchiveUsers.length,
          pageSize: 10,
          current: page,
          onChange: (e) => onChange(e),
        }}
      />
    </div>
  );
};

export default UsersArchive;
