import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "antd";

import { BreadCrumb, Tabs } from "components/shared";
// import { useCourseByIdQuery } from "store/endpoints";
import CourseDetailsCard from "pages/Settings/_components/Courses/CourseDetailsCard";
import UpdateCourseModal from "pages/Settings/_components/Courses/UpdateCourseModal";
import CourseGroups from "pages/Settings/_components/Courses/CourseGroups";

import classes from "./CourseDetails.module.scss";
import Materials from "pages/Groups/_components/Details/Materials";

export type Props = {};

const CourseDetails = (props: Props) => {
  const [updateModal, setUpdateModal] = useState(false);
  const { id } = useParams<{ id: any }>();

  // const { data: courseData, isLoading, isFetching } = useCourseByIdQuery({ id });

  // const tabs = [
  //   {
  //     key: 1,
  //     title: `Guruhlar`,
  //     panel: <CourseGroups />,
  //   },
  //   {
  //     key: 2,
  //     title: `Materiallar`,
  //     panel: <Materials course={courseData} />
  //   },
  // ];

  const breadCrumb = [
    { id: 1, title: "Sozlamalar", path: "/admin/settings" },
    { id: 2, title: "Kurslar", path: "/admin/settings?tab=3" },
    { id: 3, title:  ' umar juraev'
      // courseData?.name
     },
  ];

  return (
    <div>
      <Row>
        <Col span={24}>
          <BreadCrumb breadCrumb={breadCrumb}  />
        </Col>
      </Row>

      {/* <CourseDetailsCard
        image={courseData?.photo?.file}
        name={courseData?.name}
        price={courseData?.price}
        lessonDuration={courseData?.lesson_duration}
        courseDuration={courseData?.course_duration}
        usersCount={courseData?.direction.name}
        setUpdateModal={setUpdateModal}
        isLoading={isLoading}
      /> */}
      

      {/* <Tabs data={tabs} /> */}

      <UpdateCourseModal
        visible={updateModal}
        setVisible={setUpdateModal}
      />
    </div>
  );
};

export default CourseDetails;
