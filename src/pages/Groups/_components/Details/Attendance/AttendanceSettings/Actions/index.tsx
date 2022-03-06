import React, { FC, ReactNode } from "react";
import _ from "lodash";
import { Col } from "antd";
import { ArrowLeft } from "components/svg";
import Tag, { Actions } from "../Tag";

import classes from "../../Attendance.module.scss";
import moment from "moment";
import { Loader } from "components/shared";

interface Data {
  id?: number;
  key?: number;
  dayKey?: number;
  cancelKey?: number;
  title?: string;
  date?: string;
  defaults?: any;
}

export type Props = {
  setVisible?: Function;
  title?: string;
  key?: number;
  icon?: ReactNode;
  action?: Actions;
  dataSource?: Data[];
  calendar?: boolean;
  setCalendar?: any;
  antCalendar?: boolean;
  setShow?: any;
  handleCanceledData?: any
  canceled?: boolean
  lessonsQuery?: any
};

const SettingActions: FC<Props> = ({
  setVisible,
  title,
  dataSource,
  icon,
  action,
  setCalendar,
  antCalendar,
  setShow,
  canceled,
  lessonsQuery
}) => {
  const tagItems = [{ key: 0, title: "Orqaga", to: 0 }];

  return (
    <Col>
      <Tag
        setVisible={setVisible}
        icon={<ArrowLeft color="#323B4B" />}
        setClick={true}
        data={tagItems}
      />
      <div className={classes.title}>{title}:</div>

      <div className={classes.box}>
        {dataSource?.length ? (
          <Tag
            actions={action}
            icon={icon}
            setCalendar={setCalendar}
            setShow={setShow}
            antCalendar={antCalendar}
            canceled={canceled}
            lessonsQuery={lessonsQuery}
            data={_.sortBy(
              dataSource,
              (item) => moment(item.date) || item.dayKey || item.cancelKey
            )}
          />
        ) : (
          <Loader loaderSize={40} className={classes.loader} />
        )
        }
      </div>
    </Col>
  );
};

export default SettingActions;
