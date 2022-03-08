import React, { useState } from "react";
import { Col, Row } from "antd";

import { GroupCard } from "components/Cards";
import { useGroupsQuery } from "store/endpoints";

import classes from "./CourseGroups.module.scss";
import { useParams } from "react-router-dom";
import GroupCardSkeleton from "components/Skeleton/GroupCardSkeleton";
import { Empty } from "components/shared";

export type Props = {};

const CourseGroups = (props: Props) => {
  const { id } = useParams<{ id: any }>();
  const groupsQuery = useGroupsQuery({ course: id });

  return (
    <div className={classes.root}>
      <Row
        gutter={[{ sm: 0, md: 5, lg: 20 }, 20]}
   
      >
        {groupsQuery.isFetching && (
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
                href={`/admin/groups/${group.id}`}
                name={group.name}
                teacher={group.teacher.full_name}
                days={group.days}
                startTime={group.lesson_start_time}
                startDate={group.lessons_start_date}
                endDate={group.lessons_end_date}
                room={group.room.name}
                userCount={group.pupils_count}
              // badge={{
              //   title: group?.lesson?.name,
              //   background: colorGenerator(group?.lesson?.id),
              // }}
              />
            </Col>
          ))
        ) : (
          !groupsQuery.isLoading && <Col span={24}>
            <Empty description="Guruhlar yo'q" />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default CourseGroups;
