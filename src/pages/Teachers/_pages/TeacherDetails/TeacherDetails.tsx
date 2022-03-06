import React, { FC, useState } from "react";
import { Row, Col } from "antd";
import toast from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";

import { useTeacherByIdQuery, useUpdateTeacherMutation } from "store/endpoints";
import { BreadCrumb, Tabs } from "components/shared";
import UserCardInfo from "components/Cards/UserCardInfo";
import TeacherGroups from "pages/Teachers/_components/Details/TeacherGroups";
import UserCardSkeleton from "components/Skeleton/UserCardSkeleton";
import TeacherPaymentHistoryTable from "pages/Teachers/_components/Details/TeacherPaymentHistoryTable";
import UpdateModalTeacher from "pages/Teachers/_components/Details/UpdateModalTeacher";
import TeacherHistoryLogs from "pages/Teachers/_components/Details/TeacherHistoryLogs";
import TeacherMoreAbout from "pages/Teachers/_components/Details/TeacherMoreAbout";

import classes from "./TeacherDetails.module.scss";

type Props = {};

const TeacherDetails: FC<Props> = () => {
  const [updateModal, setUpdateModal] = useState(false);
  const { id } = useParams<{ id: any }>();
  const history = useHistory()

  const { data: teacherData, isFetching } = useTeacherByIdQuery({ id });
  const [updateTeacherMutation, { isLoading: deleteLoading }] = useUpdateTeacherMutation()

  const onDelete = () => {
    const mutationPromise = updateTeacherMutation({ id, is_removed: true }).unwrap()
    toast
      .promise(mutationPromise, {
        loading: `o'chirilmoqda...`,
        success: `muvaffaqiyatli o'chirildi`,
        error: (({ data }) => JSON.stringify(data))
      })
      .then(() => history.goBack())
  };

  const tabs = [
    {
      key: 0,
      title: `Guruhlar`,
      panel: <TeacherGroups />
    },
    {
      key: 1,
      title: `To'lovlar tarixi`,
      panel: <TeacherPaymentHistoryTable />
    },
    {
      key: 2,
      title: `Hodisalar tarixi`,
      panel: <TeacherHistoryLogs data={teacherData?.logs} />
    },
    {
      key: 3,
      title: `Ko'proq ma'lumot`,
      panel: <TeacherMoreAbout user={teacherData} />
    }
  ];

  const breadCrumb = [
    { id: 1, title: "O'qituvchilar", path: "/admin/teachers" },
    { id: 2, title: teacherData?.full_name }
  ];

  return (
    <div className={classes.student_details}>
      <Row>
        <Col span={24}>
          <BreadCrumb breadCrumb={breadCrumb} isFetching={isFetching} />
        </Col>
      </Row>
      {!isFetching ? (
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
          onDelete={onDelete}
          deleteLoading={deleteLoading}
        />
      ) : (
        <UserCardSkeleton detailsUsers />
      )}

      <Tabs data={tabs} />

      <UpdateModalTeacher
        visible={updateModal}
        setVisible={setUpdateModal}
        data={teacherData}
      />
    </div>
  );
};

export default TeacherDetails;
