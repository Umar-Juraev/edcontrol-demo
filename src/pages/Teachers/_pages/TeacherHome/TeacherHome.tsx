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
    page,
    search: debouncedText,
    groups__course__direction: teachers.direction,
    gender: teachers.gender,
    district: teachers.district,
  };
  checkObjectValueExist(queryKeys);

  // const teachersQuery = useTeachersQuery(queryKeys);

  const currentParams = history.location.search?.split("&");
  const pageParams = currentParams[0]?.split("=")[1];
  const searchParams = currentParams[1]?.split("=")[1];

  // useEffect(() => {
  //   teachersQuery.refetch();
  // }, [teachers]);

  useEffect(() => {
    pageParams && setPage(Number(pageParams));
  }, [pageParams]);

  useEffect(() => {
    searchParams && setText(decodeURI(searchParams));
  }, [searchParams]);

  function onChange(page: number) {
    setPage(page);
    history.push(`/admin/teachers?page=${page}&search=${debouncedText}`);
  }

  function onSearch(value: string) {
    history.push(`/admin/teachers?page=${page}&search=${text}`);
    setPage(1);
    setDebouncedText(value);
    // teachersQuery.refetch();
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
        <h1>O'qituvchilar</h1>

        <Col span={8}>
          <FormElements.Search
            value={text}
            onSearch={onSearch}
            // loading={teachersQuery.isFetching}
            onChange={(e) => setText(e.target.value)}
            placeholder="O'qituvchi nomi bo'yicha qidirish"
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
              Filter qilish
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              addMode
              icon={<AddIcon />}
              // loading={teachersQuery.isLoading}
              style={{ height: 50, padding: "13px 32px" }}
              onClick={() => setCreateModal((prev) => !prev)}
            >
              O'qituvchi qo'shish
            </Button>
          </Col>
        </Row>
      </Row>

      {/* <Loader spinning={teachersQuery.isFetching}> */}
        <section style={{ minHeight: 420 }}>
          <Row gutter={[0, 10]}>
            {/* {teachersQuery.isLoading && (
              <>
                <UserCardSkeleton dataNone />
                <UserCardSkeleton dataNone />
                <UserCardSkeleton dataNone />
              </>
            )}
            {teachersQuery.data?.count
              ? teachersQuery.data?.results
                  ?.filter((item) => !item.is_removed)
                  .map((user) => (
                    <UserCardInfo
                      key={user?.id}
                      image={user.photo?.file}
                      fullName={user.full_name}
                      birthDay={user.birth_date}
                      gender={user.gender}
                      groupsCount={user.groups_count}
                      price={user.salary}
                      location={user.address}
                      pathname={`/admin/teachers/${user.id}`}
                      phone={user.phone_number}
                      setUpdateModal={() => {}}
                      dataNone
                    />
                  ))
              : !teachersQuery.isLoading && (
                  <Col span={24}>
                    <Empty description="O'qituvchilar mavjud emas" />
                  </Col>
                )} */}
          </Row>
        </section>
        {/* {!teachersQuery.isLoading && (
          <Row justify="end" >
            <Pagination
              total={teachersQuery.data?.count}
              pageSize={10}
              current={page}
              onChange={onChange}
            />
          </Row>
        )} */}

        <TeacherFilterModal visible={filterModal} setVisible={setFilterModal} />
        <TeacherCreateModal visible={createModal} setVisible={setCreateModal} />
      {/* </Loader> */}
    </div>
  );
};

export default TeacherHome;
