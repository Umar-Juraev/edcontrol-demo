import  { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useHistory } from "react-router-dom";

import {  Empty,  Loader, Pagination } from "components/shared";

import classes from "./Employees.module.scss";
import UserCardSkeleton from "components/Skeleton/UserCardSkeleton";
import EmployeeCard from "pages/Settings/_components/Employees/EmployeeCard";
import UpdateEmployeeModal from "pages/Settings/_components/Employees/UpdateEmployeeModal";

type Props = {};

const Employees = (props: Props) => {
  const [updateModal, setUpdateModal] = useState<boolean>(false);


  // const employeesQuery = useEmployeesQuery()





  return (
    <div className={classes.students_page}>
      <Loader >
        <Row gutter={[0, 10]}>
          {/* {employeesQuery.isLoading && (
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
          )} */}
        </Row>

        {/* {!employeesQuery.isLoading && (
          <Row justify="end" >
            <Pagination
              total={employeesQuery.data?.count}
              pageSize={10}
              current={page}
              onChange={onChange}
            />
          </Row>
        )} */}

        <UpdateEmployeeModal
          visible={updateModal}
          setVisible={setUpdateModal}
        />
      </Loader>
    </div>
  );
};

export default Employees;
