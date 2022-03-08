import React, { useState } from "react";
import { Col, Row } from "antd";

import CourseCard from "components/Cards/CourseCard";
import { Empty, Pagination } from "components/shared";
import GroupCardSkeleton from "components/Skeleton/GroupCardSkeleton";
import UserCardSkeleton from "components/Skeleton/UserCardSkeleton";

import classes from "./CoursesMain.module.scss";

export type Props = {};

const CoursesMain = (props: Props) => {
  const [page, setPage] = useState(1);

  // const coursesQuery = useCoursesQuery({ page });

  function onChange(page: number) {
    setPage(page);
  }

  return (
    <div>
      <Row
        gutter={[{ sm: 0, md: 5, lg: 20 }, 20]}
      
      >
        {/* {coursesQuery.isLoading && (
          <>
            <GroupCardSkeleton lengthParagraph={4} />
            <GroupCardSkeleton lengthParagraph={4} />
            <GroupCardSkeleton lengthParagraph={4} />
          </>
        )} */}
        {/* {coursesQuery.data?.results.length ? (
          coursesQuery.data?.results?.map((item) => (
            <Col key={item.id} sm={24} md={12} lg={12} xl={8} xxl={6}>
              <CourseCard
                image={item.photo?.file}
                name={item.name}
                price={item.price}
                type={item.pay_for_every}
                lessonDuration={item.lesson_duration}
                courseDuration={item.course_duration}
                href={`/admin/settings/course/${item.id}`}
              />
            </Col>
          ))
        ) : (
          !coursesQuery.isLoading && <Col span={24}>
            <Empty description="Kurslar mavjud emas" />
          </Col>
        )} */}
      </Row>

      {/* {!coursesQuery.isLoading && (
        <Row justify="end" >
          <Pagination
            total={coursesQuery.data?.count}
            pageSize={10}
            current={page}
            onChange={onChange}
          />
        </Row>
      )} */}
    </div>
  );
};

export default CoursesMain;
