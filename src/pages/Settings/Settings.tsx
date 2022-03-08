import { useState } from "react";
import { Row } from "antd";
import { useHistory } from "react-router-dom";

import { Button, Tabs } from "components/shared";
import { AddIcon, BuildingIcon, NewMessageIcon } from "components/svg";
import Employees from "./_pages/Employees";
import Branches from "./_components/Branches";
import LeadForm from "./_components/LeadForm";
import CoursesMain from "./_pages/CoursesMain";
import MessageHistory from "./_pages/Messages/MessageHistory";
import CreateCourseModal from "./_components/Courses/CreateCourseModal";
import CreateEmployeeModal from "./_components/Employees/CreateEmployeeModal";
import CreateBranchModal from "./_components/CreateBranchModal/CreateBranchModal";

import classes from "./Settings.module.scss";
import { useAppSelector } from "store/hooks";

export type Props = {};

const Settings = (props: Props) => {
  const [createEmployee, setCreateEmployee] = useState(false);
  const [createCourse, setCreateCourse] = useState(false);
  const [createBranch, setCreateBranch] = useState(false);
  const history = useHistory();

  const { currentUser } = useAppSelector((state) => state.persistedData);
  const ADMIN = currentUser.data?.role == 99;

  const tabs = [
    {
      key: 1,
      title: `Message history`,
      panel: <MessageHistory />,
    },
    {
      key: 2,
      title: `Staff`,
      panel: <Employees />,
    },
    {
      key: 3,
      title: `Courses`,
      panel: <CoursesMain />,
    },
    {
      key: 4,
      title: `Form of control`,
      panel: <LeadForm />,
    },
    {
      key: 5,
      title: `Branches`,
      panel: <Branches />,
    },
  ];

  let filteredTab: any[] = tabs;

  if (ADMIN) {
    filteredTab = tabs.filter(({ key }) => key === 3 || key === 4 || key === 5);
  }


  function AddButtonRender() {
    if (history.location.search.includes("tab=2")) {
      return (
        <Button
          type="primary"
          size="large"
          addMode
          icon={<AddIcon />}
          onClick={() => setCreateEmployee((prev) => !prev)}
        >
         Add staff
        </Button>
      );
    } else if (history.location.search.includes("tab=3")) {
      return (
        <Button
          type="primary"
          size="large"
          addMode
          icon={<AddIcon />}
          onClick={() => setCreateCourse((prev) => !prev)}
        >
          Add a course
        </Button>
      );
    }
  }

  let tabExtraContent;
  if (history.location.search.includes("tab=1")) {
    tabExtraContent = (
      <Button
        iconMode
        size="large"
        icon={<NewMessageIcon />}
        onClick={() => history.push(`/admin/settings/new-message`)}
      >
        Yangi Xabar
      </Button>
    );
  } else if (history.location.search.includes("tab=5")) {
    tabExtraContent = (
      <Button
        iconMode
        size="large"
        icon={<BuildingIcon />}
        onClick={() => setCreateBranch(true)}
      >
        New Branch
      </Button>
    );
  }

  return (
    <div>
      <Row align="middle" justify="space-between" className={classes.nav}>
        <h1>Settings</h1>
        {AddButtonRender()}
      </Row>

      <Tabs
        data={filteredTab}
        onChange={(e) => history.push(`/admin/settings?tab=${e}`)}
        defaultActiveKey={history.location.search.split("=")[1]}
        tabBarExtraContent={tabExtraContent}
      />

      <CreateEmployeeModal
        visible={createEmployee}
        setVisible={setCreateEmployee}
      />
      <CreateCourseModal visible={createCourse} setVisible={setCreateCourse} />
      <CreateBranchModal visible={createBranch} setVisible={setCreateBranch} />
    </div>
  );
};

export default Settings;
