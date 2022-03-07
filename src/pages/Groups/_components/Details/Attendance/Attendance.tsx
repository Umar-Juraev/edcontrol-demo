/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { FC, useState } from "react";
import _ from "lodash";
import moment from "moment";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Col, Row, TableColumnsType } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

import { useAppSelector } from "store/hooks";
import { Table, CheckBox, PopConfirm, Button, Tooltip } from "components/shared";
import { SettingIcon } from "components/svg";
import AttendanceSettings from "./AttendanceSettings";

import classes from "./Attendance.module.scss";

export type Props = {};

const AttendanceTable: FC<Props> = () => {
  const { id } = useParams<{ id: any }>();
  const [visible, setVisible] = useState<number>(0);
  const { date } = useAppSelector((state) => state.attendance);

  const startOfMonth = moment(date).startOf("month").format("YYYY-MM-DD");
  const endOfMonth = moment(date).endOf("month").format("YYYY-MM-DD");

  // const pupilsQuery = usePupilsFullQuery({ group: id })
  // const lessonsQuery = useLessonsFullQuery({
  //   group: id,
  //   scheduled_time_from: startOfMonth,
  //   scheduled_time_to: endOfMonth,
  // });

  // const [updateMutation, { isLoading }] = useUpdateLessonMutation();



  const columns: TableColumnsType = [
    {
      title: `Talaba`,
      dataIndex: `user`,
      key: `user`,
      width: "15%",
      fixed: `left`,
      render: (value, record: any) => <div>{value.full_name}</div>,
    },

    {
      title: () => (
        <Row
          align="middle"
          justify="space-between"
          className={classes.headerBox}
        >
          {/* {_.sortBy(lessonsQuery.data, (item) => item.scheduled_time).map(
            (item) => (
              item.moved_time ? (
                <Tooltip key={item.id} title={`oldingi sana ${moment(item.scheduled_time).format("DD-MMMM")}`} >
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
          )} */}
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
          {/* {_.sortBy(lessonsQuery.data, (item) => item.scheduled_time).map(
            (item) => (
              <CheckBox
                value={{
                  lesson: item,
                  user: record.id,
                }}
                disabled={
                  isLoading || lessonsQuery.isFetching || item.is_canceled
                }
                canceled={item.is_canceled}
                moved={item.moved_time}
                defaultChecked={item.participants.includes(record.id)}
                onChange={(e: CheckboxChangeEvent) => onChange(e, item)}
              />
            )
          )} */}
        </Row>
      ),
    },
    {
      // title: () => (
      //   <Row justify="center">
      //     <PopConfirm
      //       icon={false}
      //       placement="bottomRight"
      //       okButtonProps={{ hidden: true }}
      //       cancelButtonProps={{ hidden: true }}
      //       overlayInnerStyle={{
      //         maxHeight: "50vh",
      //         overflow: "scroll",
      //       }}
      //       title={
      //         <AttendanceSettings
      //           visible={visible}
      //           setVisible={setVisible}
      //           lessonsData={lessonsQuery.data || []}
      //           lessonsQuery={lessonsQuery}
      //         />
      //       }
      //     >
      //       <Button
      //         size="large"
      //         singleIconMode
      //         icon={<SettingIcon />}
      //         style={{ background: "white" }}
      //       />
      //     </PopConfirm>
      //   </Row>
      // ),
      width: "5%",
      fixed: `right`,
    },
  ];

  return (
    <div>
      {/* <Table
        columns={columns}
        dataSource={pupilsQuery.data || []}
        loading={lessonsQuery.isFetching}
        scroll={{ x: (lessonsQuery.data?.length || 10) * 70 }}
        pagination={false}
      /> */}
    </div>
  );
};

export default AttendanceTable;
