import React, { useState } from "react";
import { Row } from "antd";
import { Button, Tabs } from "components/shared";

import { AddIcon } from "components/svg";
import RoomsTable from "./_components/RoomsTable";

import classes from "./Rooms.module.scss";
import ScheduleTable from "./_components/ScheduleTable";

export type Props = {};

const Rooms = (props: Props) => {
  const [createRoom, setCreateRoom] = useState<boolean>(false);

  const tabs = [
    {
      key: 2,
      title: `Xonalar`,
      panel: (
        <RoomsTable createRoom={createRoom} setCreateRoom={setCreateRoom} />
      ),
    },
    {
      key: 1,
      title: `Dars jadvali`,
      panel: <ScheduleTable/>,
    },
  ];

  return (
    <div>
      <Row align="middle" justify="space-between" className="nav">
        <h1>Xonalar</h1>
        <Button
          type="primary"
          addMode
          icon={<AddIcon />}
          style={{ height: 50, padding: "13px 32px" }}
          onClick={() => setCreateRoom(true)}
        >
          Xona qo'shish
        </Button>
      </Row>

      <Tabs data={tabs} />
    </div>
  );
};

export default Rooms;
