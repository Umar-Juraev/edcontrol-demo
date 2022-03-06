import { FC } from "react";
import { Card, Row, Skeleton, Col } from "antd";

import classes from "./GroupCardSkeleton.module.scss";

interface Props {
  lengthParagraph: number;
}
const GroupCardSkeleton: FC<Props> = ({ lengthParagraph }) => {
  function _length(length: number) {
    let result = [];
    for (let i = 0; i < length; i++) {
      result.push(i + 1);
    }
    return result;
  }

  return (
    <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={6}>
      <Card
        className={classes.card}
        cover={
          <Skeleton.Avatar
            active
            shape="square"
            className={classes.cardImage}
          />
        }
      >
        <Skeleton
          paragraph={{ rows: 0 }}
          active
          className={classes.group_card_title}
        />
        {_length(lengthParagraph).map((i) => (
          <Row gutter={15} key={i}>
            <Col span={4}>
              <Skeleton.Avatar size={20} active />
            </Col>
            <Col span={20}>
              <Skeleton
                paragraph={{ rows: 0 }}
                className={classes.width}
                active
              />
            </Col>
          </Row>
        ))}
          <Skeleton.Button active className={classes.btn_skeleton} />
      </Card>
    </Col>
  );
};

export default GroupCardSkeleton;
