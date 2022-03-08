import React, { FC, useState } from "react";
import { Row, Col } from "antd";

// import { useTeacherByIdQuery, useUpdateTeacherMutation } from "store/endpoints";
import { BreadCrumb, Tabs } from "components/shared";
import UserCardInfo from "components/Cards/UserCardInfo";
import TeacherGroups from "pages/Teachers/_components/Details/TeacherGroups";
import UserCardSkeleton from "components/Skeleton/UserCardSkeleton";
import TeacherPaymentHistoryTable from "pages/Teachers/_components/Details/TeacherPaymentHistoryTable";
import UpdateModalTeacher from "pages/Teachers/_components/Details/UpdateModalTeacher";
import TeacherHistoryLogs from "pages/Teachers/_components/Details/TeacherHistoryLogs";
import TeacherMoreAbout from "pages/Teachers/_components/Details/TeacherMoreAbout";

import classes from "./TeacherDetails.module.scss";
import { teacherAPI } from "fakeAPI/fakeAPI";
import { useParams } from "react-router-dom";

type Props = {};

const TeacherDetails: FC<Props> = () => {
  const [updateModal, setUpdateModal] = useState(false);
  const { id } = useParams<{ id: any }>();


  const teacherData = teacherAPI.results.filter(item => item.id === +id)[0]

  const tabs = [
    {
      key: 0,
      title: `Groups`,
      panel: <TeacherGroups />
    },
    {
      key: 1,
      title: `Payment history`,
      panel: <TeacherPaymentHistoryTable />
    },
    {
      key: 2,
      title: `History of events`,
      panel: <TeacherHistoryLogs
        data={teacherData?.logs}
      />
    },
    {
      key: 3,
      title: `More info`,
      panel: <TeacherMoreAbout />
    }
  ];

  const breadCrumb = [
    { id: 1, title: "teachers", path: "/admin/teachers" },
    { id: 2, title: teacherData.full_name }
  ];

console.log(teacherData);


  return (
    <div className={classes.student_details}>
      <Row>
        <Col span={24}>
          <BreadCrumb breadCrumb={breadCrumb}
          />
        </Col>
      </Row>
      
        <UserCardInfo
          key={teacherData?.id}
          image={teacherData?.photo?.file}
          fullName={teacherData?.full_name}
          birthDay={teacherData?.birth_date}
          gender={teacherData?.gender}
          groupsCount={teacherData?.groups_count}
          price={teacherData?.salary}
          location={teacherData?.district.name}
          pathname={`/admin/teachers/${teacherData?.id}`}
          phone={teacherData?.phone_number}
          details={true}
          setUpdateModal={setUpdateModal}
        />


      <Tabs data={tabs} />

      <UpdateModalTeacher
        visible={updateModal}
        setVisible={setUpdateModal}
      />
    </div>
  );
};

export default TeacherDetails;
