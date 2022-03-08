import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row } from "antd";

import {
  Button,
  Empty,
  FormElements,
  Loader,
  Pagination,
} from "components/shared";
import { GroupCard } from "components/Cards";
import { useGroupsQuery } from "store/endpoints";
import FilterModalGroup from "pages/Groups/_components/FilterModalGroup";
import CreateModalGroup from "pages/Groups/_components/CreateModalGroup";
import { useAppSelector } from "store/hooks";
import { checkObjectValueExist } from "utils";
import { AddIcon, FIlterIcon } from "components/svg";
import GroupCardSkeleton from "components/Skeleton/GroupCardSkeleton";

import { groupsAPI, teacherAPI, studentAPI, clientsAPI } from "../../../../fakeAPI/fakeAPI";



import classes from "./GroupsHome.module.scss";

export type Props = {};

const GroupsHome = (props: Props) => {
  const [filterModal, setFilterModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);

  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const history = useHistory();

  const { groups } = useAppSelector((state) => state.filters);


  const queryKeys = {
    page,
    search: debouncedText,
    course__direction: groups.direction,
    teacher: groups.teacher,
    days: groups.days,
    room: groups.room,
    // lessons_start_date: moment(groups.lessonsStartDate).format("DD-MMMM-YYYY"),
    // lessons_end_date: moment(groups.lessonsEndDate).format("DD-MMMM-YYYY")
  };
  checkObjectValueExist(queryKeys);

  const groupsQuery = useGroupsQuery(queryKeys);

  const currentParams = history.location.search?.split("&");
  const pageParams = currentParams[0]?.split("=")[1];
  const searchParams = currentParams[1]?.split("=")[1];
  useEffect(() => {
    groupsQuery.refetch();
  }, [groups]);

  useEffect(() => {
    pageParams && setPage(Number(pageParams));
  }, [pageParams]);

  useEffect(() => {
    searchParams && setText(decodeURI(searchParams));
  }, [searchParams]);

  function onChange(page: number) {
    setPage(page);
    history.push(`/admin/groups?page=${page}`);
  }

  return (
    <div className={classes.root}>
      <Row align="middle" justify="space-between" className={classes.nav}>
        <h1>Groups</h1>
        <Col span={8}>
          <FormElements.Search
            value={text}
            loading={groupsQuery.isFetching}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search by group name"
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
              Filter
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              addMode
              icon={<AddIcon />}
              loading={groupsQuery.isLoading}
              onClick={() => setCreateModal(true)}
            >
             Add a group
            </Button>
          </Col>
        </Row>
      </Row>

      <Loader spinning={groupsQuery.isFetching}>
        <Row
          gutter={[{ sm: 0, md: 5, lg: 20 }, 20]}

        >
          {groupsAPI.results.length <=0 && (
            <>
              <GroupCardSkeleton lengthParagraph={5} />
              <GroupCardSkeleton lengthParagraph={5} />
              <GroupCardSkeleton lengthParagraph={5} />
            </>
          )}
          {
            groupsAPI.results.map((group) => (
              <Col key={group.id} sm={24} md={12} lg={12} xl={8} xxl={6}>
                <GroupCard
                  href={`/admin/groups/${group.id}`}
                  name={group.name}
                  teacher={group.teacher.full_name}
                  days={group.days}
                  startTime={group.lesson_start_time}
                  startDate={group.lessons_start_date}
                  endDate={group.lessons_end_date}
                  room={group.room.name}
                  userCount={group.pupils_count}
                  photo={group.photo?.file}
                />
              </Col>
            ))
          }
        </Row>

        {!groupsQuery.isLoading && (
          <Row justify="end" >
            <Pagination
              total={groupsAPI.count}
              pageSize={10}
              current={page}
              onChange={onChange}
            />
          </Row>
        )}

        <CreateModalGroup visible={createModal} setVisible={setCreateModal} />
        <FilterModalGroup
          visible={filterModal}
          setVisible={setFilterModal}
        />
      </Loader>
    </div>
  );
};

export default GroupsHome;
