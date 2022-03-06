import React from "react";
import { Col, Row } from "antd";

import { GroupCard } from "components/Cards";
import { useGroupsQuery } from "store/endpoints";

import { useParams } from "react-router-dom";
import GroupCardSkeleton from "components/Skeleton/GroupCardSkeleton";
import { Empty, Loader } from "components/shared";

export type Props = {};

const StudentGroups = (props: Props) => {
  const { id } = useParams<{ id: any }>();
  const groupsQuery = useGroupsQuery({ pupils__user: id });

  return (
    <div>
      <Loader spinning={groupsQuery.isFetching}>
        <Row
          gutter={[{ sm: 0, md: 5, lg: 20 }, 20]}
          style={{ margin: "24px 0 0 0" }}
        >
          {groupsQuery.isLoading && (
            <>
              <GroupCardSkeleton lengthParagraph={5} />
              <GroupCardSkeleton lengthParagraph={5} />
              <GroupCardSkeleton lengthParagraph={5} />
            </>
          )}
          {groupsQuery.data?.count ? (
            groupsQuery.data?.results?.map((group) => (
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
          ) : (
            !groupsQuery.isLoading && <Col span={24}>
              <Empty />
            </Col>
          )}
        </Row>
      </Loader>
    </div>
  );
};

export default StudentGroups;
