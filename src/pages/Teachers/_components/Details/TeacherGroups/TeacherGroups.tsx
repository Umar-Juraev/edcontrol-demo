import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { useHistory, useParams } from "react-router-dom";

import { Empty, Loader, Pagination } from "components/shared";
import { GroupCard } from "components/Cards";

import GroupCardSkeleton from "components/Skeleton/GroupCardSkeleton";

export type Props = {};

const TeacherGroups = (props: Props) => {
  const { id } = useParams<{ id: any }>();
  const [page, setPage] = useState(1);
  const history = useHistory();


  const currentParams = history.location.search?.split("&");
  const pageParams = currentParams[0]?.split("=")[1];

  useEffect(() => {
    pageParams && setPage(Number(pageParams));
  }, [pageParams]);

  function onChange(page: number) {
    setPage(page);
  }

  return (
    <div>
      <Loader spinning={false}>
        <Row
          gutter={[{ sm: 0, md: 5, lg: 20 }, 20]}
          style={{ margin: "24px 0 0 0" }}
        >
          {/* {groupsQuery.isLoading && (
            <>
              <GroupCardSkeleton lengthParagraph={5} />
              <GroupCardSkeleton lengthParagraph={5} />
              <GroupCardSkeleton lengthParagraph={5} />
            </>
          )}
          {groupsQuery.data?.count
            ? groupsQuery.data?.results?.map((group) => (
              <Col key={group.id} sm={24} md={12} lg={12} xl={8} xxl={6}>
                <GroupCard
                  photo={group.photo?.file}
                  href={`/admin/groups/${group.id}`}
                  name={group.name}
                  teacher={group.teacher.full_name}
                  days={group.days}
                  startTime={group.lesson_start_time}
                  startDate={group.lessons_start_date}
                  endDate={group.lessons_end_date}
                  room={group.room.name}
                  userCount={group.pupils_count}
                />
              </Col>
            ))
            : !groupsQuery.isLoading && (
              <Col span={24}>
                <Empty description="Guruhlar yo'q" />
              </Col>
            )}
        </Row>

        {!groupsQuery.isLoading && (
          <Row justify="end" style={{ marginTop: 10 }}>
            <Pagination
              total={groupsQuery.data?.count}
              pageSize={10}
              current={page}
              onChange={onChange}
            />
          )} */}
          </Row>
      </Loader>
    </div>
  );
};

export default TeacherGroups;
