import React, { FC, ReactNode } from "react";
import { Tabs, TabsProps } from "antd";

import "./Tabs.scss";
interface tabs {
  key: string | number;
  title: string | ReactNode;
  panel: ReactNode | string;
}

export type Props = TabsProps & {
  data: tabs[];
};

const { TabPane } = Tabs;

const TabsComponent: FC<Props> = ({ data, ...props }) => {
  return (
    <>
      <Tabs size="large" {...props} >
        {data?.map((item) => (
          <TabPane tab={item.title} key={item.key} >
            {item.panel}
          </TabPane>
        ))}
      </Tabs>
    </>
  );
};

export default TabsComponent;
