import { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbProps,
  BreadcrumbItemProps,
  Skeleton,
  Col,
  Row,
} from "antd";
import { Link } from "react-router-dom";
import cn from "classnames";

import classes from "./BreadCrumb.module.scss";

type breadCrumb = {
  id: number;
  title?: string;
  path?: string | void;
};

type Props = BreadcrumbProps & {
  breadCrumb: Array<breadCrumb>;
  isFetching?: boolean;
};

const BreadCrumb: FC<Props> = ({ breadCrumb, isFetching, ...props }) => {
  return (
    <div className={classes.breadcrumbWrapper}>
      <Breadcrumb separator={false} {...props}>
        {breadCrumb &&
          breadCrumb.map((item, i) => {
            return (
              <Breadcrumb.Item key={i}>
                {item.path ? (
                  <>
                    {isFetching ? (
                      <Col span={24}>
                        <Row>
                          <Skeleton
                            active
                            paragraph={{ rows: 0 }}
                            className={classes.item}
                          />
                          <Breadcrumb.Separator>/</Breadcrumb.Separator>
                        </Row>
                      </Col>
                    ) : (
                      <Row>
                        <Link to={item.path}>{item.title}</Link>
                        <Breadcrumb.Separator>/</Breadcrumb.Separator>
                      </Row>
                    )}
                  </>
                ) : (
                  <>
                    {isFetching ? (
                      <Col span={24}>
                        <Skeleton
                          active
                          paragraph={{ rows: 0 }}
                          className={classes.item}
                        />
                      </Col>
                    ) : (
                      ` ${item.title}`
                    )}
                  </>
                )}
              </Breadcrumb.Item>
            );
          })}
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumb;
