import  { useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "antd";

import { BreadCrumb, Tabs } from "components/shared";
import CourseDetailsCard from "pages/Settings/_components/Courses/CourseDetailsCard";
import UpdateCourseModal from "pages/Settings/_components/Courses/UpdateCourseModal";
import { coursesAPI } from "fakeAPI/fakeAPI";
import Materials from "pages/Groups/_components/Details/Materials";
import CourseGroups from "pages/Settings/_components/Courses/CourseGroups";

export type Props = {};

const CourseDetails = (props: Props) => {
  const [updateModal, setUpdateModal] = useState(false);
  const { id } = useParams<{ id: any }>();


  const tabs = [
    {
      key: 1,
      title: `Guruhlar`,
      panel: <CourseGroups />,
    },
    {
      key: 2,
      title: `Materiallar`,
      panel: <Materials course={coursesAPI.results.map(item => item.id === id)} />
    },
  ];



  const breadCrumb = [
    { id: 1, title: "Settings", path: "/admin/settings" },
    { id: 2, title: "Courses", path: "/admin/settings?tab=3" },
  ];

  return (
    <div>
      <Row>
        <Col span={24}>
          <BreadCrumb breadCrumb={breadCrumb} />
        </Col>
      </Row>


      {coursesAPI.results.map(item => {
        if (item.id === id) {
          return (
            <CourseDetailsCard
              image={item?.photo?.file}
              name={item?.name}
              price={item?.price}
              lessonDuration={item?.lesson_duration}
              courseDuration={item?.course_duration}
              usersCount={item?.direction.name}
              setUpdateModal={setUpdateModal}
            />

          )
        }
      })

      }


      <Tabs data={tabs} />

      <UpdateCourseModal
        visible={updateModal}
        setVisible={setUpdateModal}
      />
    </div>
  );
};

export default CourseDetails;
