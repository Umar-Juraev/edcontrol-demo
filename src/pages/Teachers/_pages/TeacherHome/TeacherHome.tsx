import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "./TeacherHome.module.scss";

import { checkObjectValueExist } from "utils";
// import { useTeachersQuery } from "store/endpoints";
import { FIlterIcon, AddIcon } from "components/svg";
import UserCardInfo from "components/Cards/UserCardInfo";
import {
  Button,
  Empty,
  FormElements,
  Loader,
  Pagination,
} from "components/shared";
import UserCardSkeleton from "components/Skeleton/UserCardSkeleton";
import TeacherCreateModal from "pages/Teachers/_components/TeacherCreateModal";
import TeacherFilterModal from "pages/Teachers/_components/TeacherFilterModal";
import { useAppSelector } from "store/hooks";
import { teacherAPI } from "fakeAPI/fakeAPI";

export type Props = {};

const TeacherHome = (props: Props) => {
  const [filterModal, setFilterModal] = useState(false);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const history = useHistory();

  const { teachers } = useAppSelector((state) => state.teacherFilter);

  const queryKeys = {
    search: debouncedText,
    groups__course__direction: teachers.direction,
    gender: teachers.gender,
    district: teachers.district,
  };
  checkObjectValueExist(queryKeys);


  const currentParams = history.location.search?.split("&");
  const pageParams = currentParams[0]?.split("=")[1];
  const searchParams = currentParams[1]?.split("=")[1];



  function onChange(page: number) {
    history.push(`/admin/teachers?page=${page}&search=${debouncedText}`);
  }





  return (
    <div className={classes.students_page}>
      <Row
        align="middle"
        justify="space-between"
        className={classes.nav}
        wrap={true}
        gutter={12}
      >
        <h1>Teachers</h1>

        <Col span={8}>
          <FormElements.Search
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search by teacher name"
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
            Add a teacher
            </Button>
          </Col>
        </Row>
      </Row>

      {/* <Loader spinning={teachersQuery.isFetching}> */}
      <section style={{ minHeight: 420 }}>
        <Row gutter={[0, 10]}>
          {teacherAPI.results.length <= 0 && (
            <>
              <UserCardSkeleton dataNone />
              <UserCardSkeleton dataNone />
              <UserCardSkeleton dataNone />
            </>
          )}
          {

            teacherAPI.results
              .map((user) => (
                <UserCardInfo
                  key={user?.id}
                  image={user.photo?.file}
                  fullName={user.full_name}
                  birthDay={user.birth_date}
                  gender={user.gender}
                  groupsCount={user.groups_count}
                  price={user.salary}
                  pathname={`/admin/teachers/${user.id}`}
                  phone={user.phone_number}
                  location={"Tashkent Uzbekistan"}
                  setUpdateModal={() => { }}
                  dataNone
                />
              ))
          }
        </Row>
      </section>

      <Row justify="end" >
        <Pagination
          total={teacherAPI.count}
          pageSize={10}
          current={page}
          onChange={onChange}
        />
      </Row>


      <TeacherFilterModal visible={filterModal} setVisible={setFilterModal} />
      <TeacherCreateModal visible={createModal} setVisible={setCreateModal} />
      {/* </Loader> */}
    </div>
  );
};

export default TeacherHome;
