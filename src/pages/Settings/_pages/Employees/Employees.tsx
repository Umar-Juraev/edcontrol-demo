import  { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useHistory } from "react-router-dom";

import { useDeleteEmployeeMutation, useEmployeesQuery,  } from "store/endpoints";
import {  Empty,  Loader, Pagination } from "components/shared";

import classes from "./Employees.module.scss";
import UserCardSkeleton from "components/Skeleton/UserCardSkeleton";
import EmployeeCard from "pages/Settings/_components/Employees/EmployeeCard";
import UpdateEmployeeModal from "pages/Settings/_components/Employees/UpdateEmployeeModal";
import { EmployeesDTO } from "types";
import toast from "react-hot-toast";

type Props = {};

const Employees = (props: Props) => {
  const [updateModal, setUpdateModal] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeesDTO>();
  const [page, setPage] = useState(1);
  const history = useHistory();

  const employeesQuery = useEmployeesQuery()
  const [deleteEmployeeMutation, { isLoading: deleteLoading }] = useDeleteEmployeeMutation()

  const currentParams = history.location.search?.split("&");
  const pageParams = currentParams[0]?.split("=")[1];

  useEffect(() => {
    pageParams && setPage(Number(pageParams));
  }, [pageParams]);

  function onChange(page: number) {
    setPage(page);
  }

  const onDelete = () => {
    const mutationPromise = deleteEmployeeMutation({ id: selectedEmployee?.id }).unwrap()
    toast
      .promise(mutationPromise, {
        loading: `o'chirilmoqda...`,
        success: `muvaffaqiyatli o'chirildi`,
        error: (({ data }) => JSON.stringify(data))
      })
  };

  return (
    <div className={classes.students_page}>
      <Loader spinning={employeesQuery.isFetching}>
        <Row gutter={[0, 10]}>
          {employeesQuery.isLoading && (
            <>
              <UserCardSkeleton />
              <UserCardSkeleton />
              <UserCardSkeleton />
            </>
          )}
          {employeesQuery.data?.count ? (
            employeesQuery.data?.results?.map((item) => (
              <EmployeeCard
                key={item?.id}
                image={item.photo?.file}
                fullName={item?.full_name}
                gender={item?.gender}
                birthDay={item?.birth_date}
                phone={item?.phone_number}
                location={item?.district.name}
                role={item?.role}
                setUpdateModal={setUpdateModal}
                onClick={() => setSelectedEmployee(item)}
                onDelete={onDelete}
                deleteLoading={deleteLoading}
              />
            ))
          ) : (
            !employeesQuery.isLoading && <Col span={24}>
              <Empty description="Talabalar mavjud emas" />
            </Col>
          )}
        </Row>

        {!employeesQuery.isLoading && (
          <Row justify="end" style={{ marginTop: 10 }}>
            <Pagination
              total={employeesQuery.data?.count}
              pageSize={10}
              current={page}
              onChange={onChange}
            />
          </Row>
        )}

        <UpdateEmployeeModal
          data={selectedEmployee}
          visible={updateModal}
          setVisible={setUpdateModal}
        />
      </Loader>
    </div>
  );
};

export default Employees;
