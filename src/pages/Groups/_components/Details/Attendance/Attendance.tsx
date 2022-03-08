/* eslint-disable @typescript-eslint/no-unused-expressions */
import  { FC, useState } from "react";
import _ from "lodash";
import moment from "moment";
import { Col, Row, TableColumnsType } from "antd";

import { Table, CheckBox, PopConfirm, Button, Tooltip } from "components/shared";
import { SettingIcon } from "components/svg";
import AttendanceSettings from "./AttendanceSettings";

import classes from "./Attendance.module.scss";
import { lessonAPI, pupilsAPI } from "fakeAPI/fakeAPI";

export type Props = {};

const AttendanceTable: FC<Props> = () => {
  const [visible, setVisible] = useState<number>(0);

  const columns: TableColumnsType = [
    {
      title: `Student`,
      dataIndex: `user`,
      key: `user`,
      width: "15%",
      fixed: `left`,
      render: (value) => <div>{value.full_name}</div>,
    },

    {
      title: () => (
        <Row
          align="middle"
          justify="space-between"
          className={classes.headerBox}
        >
          {_.sortBy(lessonAPI.results, (item) => item.scheduled_time).map(
            (item) => (
              item.moved_time ? (
                <Tooltip key={item.id} title={`previous date ${moment(item.scheduled_time).format("DD-MMMM")}`} >
                  <Col
                    className={`
                      ${classes.dateTitle} 
                      ${item.is_canceled && classes.canceled_lesson}
                      ${item.moved_time && classes.moved_lesson}
                    `}
                  >
                    {moment(
                      item.moved_time ? item.moved_time : item.scheduled_time
                    ).format("DD-MMM")}
                  </Col>
                </Tooltip>
              ) : (
                <Col
                  key={item.id}
                  className={`
                    ${classes.dateTitle} 
                    ${item.is_canceled && classes.canceled_lesson}
                    ${item.moved_time && classes.moved_lesson}
                  `}
                >
                  {moment(
                    item.moved_time ? item.moved_time : item.scheduled_time
                  ).format("DD-MMM")}
                </Col>
              )
            )
          )}
        </Row >
      ),
      dataIndex: [`user`, `full_name`],
      key: `full_name`,
      render: (value, record: any) => (
        <Row
          align="middle"
          justify="space-between"
          className={`${classes.headerBox} ${record.is_canceled && classes.CancelLesson
            }`}
        >
          {_.sortBy(lessonAPI.results, (item) => item.scheduled_time).map(
            (item) => (
              <CheckBox
                value={{
                  lesson: item,
                  user: record.id,
                }}
                canceled={item.is_canceled}
              />
            )
          )}
        </Row>
      ),
    },
    {
      title: () => (
        <Row justify="center">
          <PopConfirm
            icon={false}
            placement="bottomRight"
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
            overlayInnerStyle={{
              maxHeight: "50vh",
              overflow: "scroll",
            }}
            title={
              <AttendanceSettings
                visible={visible}
                setVisible={setVisible}
                lessonsData={lessonAPI.results || []}
                lessonsQuery={lessonAPI}
              />
            }
          >
            <Button
              size="large"
              singleIconMode
              icon={<SettingIcon />}
              style={{ background: "white" }}
            />
          </PopConfirm>
        </Row>
      ),
      width: "5%",
      fixed: `right`,
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={pupilsAPI.results || []}
        scroll={{ x: (pupilsAPI.results.length || 10) * 70 }}
        pagination={false}
      />
    </div>
  );
};

export default AttendanceTable;
