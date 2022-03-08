import { Col, Row } from "antd";

import CourseCard from "components/Cards/CourseCard";
import {  Pagination } from "components/shared";
import GroupCardSkeleton from "components/Skeleton/GroupCardSkeleton";
import { coursesAPI } from "fakeAPI/fakeAPI";

export type Props = {};

const CoursesMain = (props: Props) => {

  return (
    <div>
      <Row
        gutter={[{ sm: 0, md: 5, lg: 20 }, 20]}
      
      >
        {coursesAPI.results.length <= 0  && (
          <>
            <GroupCardSkeleton lengthParagraph={4} />
            <GroupCardSkeleton lengthParagraph={4} />
            <GroupCardSkeleton lengthParagraph={4} />
          </>
        )}
        {coursesAPI.results.map((item) => (
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
        }
      </Row>

        <Row justify="end" >
          <Pagination
            total={coursesAPI.count}
            pageSize={10}
          />
        </Row>
  
    </div>
  );
};

export default CoursesMain;
