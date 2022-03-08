import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useHistory } from "react-router-dom";

import { AddIcon, FIlterIcon } from "components/svg";
import UserCardInfo from "components/Cards/UserCardInfo";
import {
  Button,
  Empty,
  FormElements,
  Loader,
  Pagination,
} from "components/shared";
import StudentCreateModal from "pages/Students/_components/StudentCreateModal";

import classes from "./StudentsHome.module.scss";
import UserCardSkeleton from "components/Skeleton/UserCardSkeleton";
import StudentsFilterModal from "../../_components/StudentFilterModal/StudentsFilterModal";
import { useAppSelector } from "store/hooks";
import { checkObjectValueExist } from "utils";
import { studentAPI } from "fakeAPI/fakeAPI";

type Props = {};

const StudentsHome = (props: Props) => {
  const [filterModal, setFilterModal] = useState(false);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const history = useHistory();

  const { students } = useAppSelector((state) => state.filters);

  const queryKeys = {
    page,
    search: debouncedText,
    pupils__group__course__direction: students.pupils__group__course__direction,
    pupils__group: students.pupils__group,
    gender: students.gender,
    district: students.district,
    pupils__group__teacher: students.pupils__group__teacher,
  };

  checkObjectValueExist(queryKeys);



  function onChange(page: number) {
    history.push(`/admin/students?page=${page}&search=${debouncedText}`);
  }


  return (
    <div className={classes.students_page}>
      <Row
        align="middle"
        justify="space-between"
        wrap={true}
        className={classes.nav}
        gutter={12}
      >
        <h1>Students</h1>

        <Col span={8}>
          <FormElements.Search
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search by student name"
          />
        </Col>
        <Row gutter={8}>
          <Col>
            <Button
              type="primary"
              size="large"
              filter
              icon={<FIlterIcon />}
              onClick={() => setFilterModal((prev) => !prev)}
            >
         Filtering
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              addMode
              icon={<AddIcon />}
              style={{ height: 50, padding: "13px 32px" }}
              onClick={() => setCreateModal((prev) => !prev)}
            >
              Add a student
            </Button>
          </Col>
        </Row>
      </Row>

      <Loader spinning={false}>
        <section style={{ minHeight: 420 }}>
          <Row gutter={[0, 10]}>
            {studentAPI.results.length <= 0 && (
              <>
                <UserCardSkeleton dataNone />
                <UserCardSkeleton dataNone />
                <UserCardSkeleton dataNone />
              </>
            )}
            {studentAPI.results.map((item) => (
              <UserCardInfo
                key={item?.id}
                image={item.photo?.file}
                fullName={item?.full_name}
                birthDay={item?.birth_date}
                gender={item?.gender}
                groupsCount={item?.groups_count}
                price={item?.balance}
                location={"Tashkent Uzbekistan"}
                pathname={`/admin/students/${item.id}`}
                phone={item?.phone_number}
                setUpdateModal={() => { }}
                dataNone
              />
            ))
            }
          </Row>
        </section>

        <Row justify="end" >
          <Pagination
            total={studentAPI.count}
            pageSize={10}
            current={page}
            onChange={onChange}
          />
        </Row>


        <StudentsFilterModal
          visible={filterModal}
          setVisible={setFilterModal}
        />
        <StudentCreateModal visible={createModal} setVisible={setCreateModal} />
      </Loader>
    </div>
  );
};

export default StudentsHome;
