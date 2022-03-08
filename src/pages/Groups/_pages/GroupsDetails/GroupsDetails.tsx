import { useState } from "react";
import classes from "./GroupsDetails.module.scss";
import { useHistory, useParams } from "react-router-dom";
import { Col, Row } from "antd";

import { BreadCrumb, Button, Tabs } from "components/shared";
import UserCardSkeleton from "components/Skeleton/UserCardSkeleton";
import { useGroupByIdQuery } from "store/endpoints";
import UpdateModalGroup from "pages/Groups/_components/Details/UpdateModalGroup";
import AddStudentModal from "pages/Groups/_components/Details/AddStudentModal";
import GroupDetailsCard from "pages/Groups/_components/Details/GroupDetailsCard";

import StudentsTable from "../../_components/Details/StudentsTable";
import Attendance from "../../_components/Details/Attendance";
import Materials from "../../_components/Details/Materials/Materials";
import Discounts from "../../_components/Details/Discounts/index";
import HistoryJournal from "../../_components/Details/HistoryJournal/index";
import { groupsAPI } from "fakeAPI/fakeAPI";

export type Props = {};

const GroupsDetails = (props: Props) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [addStudentModal, setAddStudentModal] = useState(false);
  const { id } = useParams<{ id: any }>();
  const history = useHistory();
  const groupData = groupsAPI.results.filter(item => item.id === +id)[0]

  const tabs = [
    { key: 1, title: `Students`, panel: <StudentsTable /> },
    { key: 2, title: `Attendance`, panel: <Attendance /> },
    {
      key: 3,
      title: `Materials`,
      panel: <Materials course={groupData.course} />,
    },
    { key: 4, title: `Discounts`, panel: <Discounts /> },
    { key: 5, title: `History of magazines`, panel: <HistoryJournal /> },
  ];

  const breadCrumb = [
    { id: 1, title: "Groups", path: "/admin/groups" },
    { id: 2, title: `${groupData.name}` },
  ];

  let tabExtraContent;
  if (
    history.location.search.includes("tab=1") ||
    !history.location.search.includes("tab")
  ) {
    tabExtraContent = (
      <Button size="large" iconMode onClick={() => setAddStudentModal(true)}>
        Add a student
      </Button>
    );
  }

  return (
    <div className={classes.group_details_page}>
      <Row>
        <Col span={24}>
          <BreadCrumb breadCrumb={breadCrumb} />
        </Col>
      </Row>
      <GroupDetailsCard
        key={groupData.id}
        image={groupData?.photo?.file}
        name={groupData?.name}
        days={groupData?.days}
        teacher={groupData?.teacher.full_name}
        startDate={groupData?.lessons_start_date}
        endDate={groupData?.lessons_end_date}
        startTime={groupData?.lesson_start_time}
        room={groupData?.room.name}
        course={groupData?.course.name}
        price={groupData?.course.price}
        setUpdateModal={setUpdateModal}
      />

      <Tabs
        data={tabs}
        onChange={(e) => history.push(`/admin/groups/${id}?tab=${e}`)}
        defaultActiveKey={history.location.search.split("")[5]}
        tabBarExtraContent={tabExtraContent}
      />

      <AddStudentModal
        visible={addStudentModal}
        setVisible={setAddStudentModal}
      />

      <UpdateModalGroup
        visible={updateModal}
        setVisible={setUpdateModal}
      />
    </div>
  );
};

export default GroupsDetails;
