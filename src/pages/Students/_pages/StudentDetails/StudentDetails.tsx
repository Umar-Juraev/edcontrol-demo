import React, { FC, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Row, Col } from "antd";

import { TopUpBalanceIcon } from "components/svg";
import UserCardInfo from "components/Cards/UserCardInfo";
import { BreadCrumb, Button, Tabs } from "components/shared";
import UserCardSkeleton from "components/Skeleton/UserCardSkeleton";
// import { useStudentByIdQuery, useUpdateStudentMutation } from "store/endpoints";

import classes from "./StudentDetails.module.scss";
import StudentHistoryMesseges from "pages/Students/_components/Details/StudentHistoryMessage";
import StudentGroups from "pages/Students/_components/Details/StudentGroups";
import StudentHistoryStatus from "pages/Students/_components/Details/StudentHistoryStatus";
import StudentPaymentTable from "pages/Students/_components/Details/StudentPaymentTable";
import StudentHistoryLogs from "pages/Students/_components/Details/StudentHistoryLogs";
import StudentMoreAbout from "pages/Students/_components/Details/StudentMoreAbout";
import UpdateModalStudent from "pages/Students/_components/Details/UpdateModalStudent";
import StudentPaymentModal from "pages/Students/_components/Details/PaymentModal";
import CommentModal from "pages/Students/_components/Details/CommentModal";
import ShowMessageModal from "pages/Students/_components/Details/ShowMessageModal/ShowMessageModal";
import NewMessageModal from "pages/Students/_components/Details/NewMessageModal";
import { studentAPI } from "fakeAPI/fakeAPI";

type Props = {};

const StudentDetails: FC<Props> = () => {
  const [paymentModal, setPaymentModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [commentModal, setCommnetModal] = useState(false);
  const [newMessageModal, setNewMessageModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const { id } = useParams<{ id: any }>();
  const history = useHistory();

  const studentData = studentAPI.results.filter(item => item.id === +id)[0]

  const tabs = [
    {
      key: 1,
      title: `Groups`,
      panel: <StudentGroups />,
    },
    {
      key: 2,
      title: `Payments`,
      panel: <StudentPaymentTable setVisible={setCommnetModal} />,
    },
    {
      key: 3,
      title: `History of events`,
      panel: <StudentHistoryLogs
        data={studentData?.logs}
      />,
    },
    {
      key: 4,
      title: `More info`,
      panel: <StudentMoreAbout
      />,
    },
    {
      key: 5,
      title: `Status history`,
      panel: <StudentHistoryStatus data={studentData?.logs} />,
    },
    {
      key: 6,
      title: `Message history`,
      panel: (
        <StudentHistoryMesseges
          setVisible={setShowMessageModal}
          data={studentData?.logs}
        />
      ),
    },
  ];

  const breadCrumb = [
    { id: 1, title: "Students", path: "/admin/students" },
    { id: 2, title: studentData?.full_name },
  ];

  let tabExtraContent;
  if (history.location.search.includes("tab=2")) {
    tabExtraContent = (
      <Button
        size="large"
        iconMode
        icon={<TopUpBalanceIcon />}
        onClick={() => setPaymentModal(true)}
      >
       Replenish the account
      </Button>
    );
  }
  if (history.location.search.includes("tab=6")) {
    tabExtraContent = (
      <Button
        size="large"
        iconMode
        icon={<TopUpBalanceIcon />}
        onClick={() => setNewMessageModal(true)}
      >
        New message
      </Button>
    );
  }

  return (
    <div className={classes.student_details}>
      <Row>
        <Col span={24}>
          <BreadCrumb breadCrumb={breadCrumb} />
        </Col>
      </Row>


      <UserCardInfo
        key={studentData?.id}
        image={studentData?.photo?.file}
        fullName={studentData?.full_name}
        birthDay={studentData?.birth_date}
        gender={studentData?.gender}
        groupsCount={studentData?.groups_count}
        price={studentData?.balance}
        location={studentData?.district.name}
        pathname={`/admin/students/${studentData?.id}`}
        phone={studentData?.phone_number}
        details={true}
        setUpdateModal={setUpdateModal}
      />


      <Tabs
        data={tabs}
        onChange={(e) => history.push(`/admin/students/${id}?tab=${e}`)}
        defaultActiveKey={history.location.search.split("=")[1]}
        tabBarExtraContent={tabExtraContent}
      />

      <UpdateModalStudent
        visible={updateModal}
        setVisible={setUpdateModal}
      />

      <StudentPaymentModal
        visible={paymentModal}
        setVisible={setPaymentModal}
      />
      <CommentModal visible={commentModal} setVisible={setCommnetModal} />
      <NewMessageModal
        visible={newMessageModal}
        setVisible={setNewMessageModal}
      />
      <ShowMessageModal
        visible={showMessageModal}
        setVisible={setShowMessageModal}
      />
    </div>
  );
};

export default StudentDetails;
