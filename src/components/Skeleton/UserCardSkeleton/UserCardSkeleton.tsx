import { FC } from "react";
import { Skeleton, Col, Row } from "antd";

import classes from "./UserCardSkeleton.module.scss";

type UserCardProps = {
  detailsGroup?: boolean;
  detailsUsers?: boolean;
  col?: number | string;
  lengthParagraph?: number;
  dataNone?: boolean;
};

const UserCardSkeleton: FC<UserCardProps> = ({
  detailsGroup,
  detailsUsers,
  col,
  lengthParagraph = 6,
  dataNone,
}) => {
  function _length(length: number) {
    let result = [];
    for (let i = 0; i < length; i++) {
      result.push(i + 1);
    }
    return result;
  }

  return (
    <div
      className={
        detailsGroup
          ? `${classes.user_card_info} ${classes.detailsGroup}`
          : `${classes.user_card_info}`
      }
    >
      <Row
        justify="space-between"
        align="middle"
        wrap={false}
        gutter={[{ xs: 0, sm: 4, md: 12 }, 12]}
        className={
          detailsUsers
            ? `  ${classes.user_card_inform} ${classes.details_inform}`
            : `  ${classes.user_card_inform}`
        }
      >
        <Row wrap={false} gutter={24}>
          <Col span={3} xs={6} sm={8} md={6} lg={6} xl={detailsUsers ? 5 : 4}>
            <Skeleton.Avatar
              active
              shape="square"
              className={
                detailsUsers
                  ? `  ${classes.user_image} ${classes.detailsUsers}`
                  : `  ${classes.user_image}`
              }
            />
          </Col>

          <div className={classes.box}>
            <Skeleton
              paragraph={{ rows: 0 }}
              className={classes.title}
              active
            />

            <Row
              justify="space-between"
              gutter={[0, 10]}
              className={dataNone ? classes.user_data : classes.user_data_grid}
            >
              {_length(lengthParagraph).map((i, key) => (
                <Col key={key} span={8} xl={7}>
                  <Row gutter={16} justify="start" wrap={false}>
                    <Col>
                      <Skeleton.Avatar
                        active
                        style={{ width: 20, height: 20 }}
                      />
                    </Col>
                    <Col>
                      <Skeleton
                        active
                        paragraph={{ rows: 0 }}
                        className={classes.text}
                      />
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </div>
        </Row>

        <Col
          className={classes.card_btns}
          span={detailsUsers ? 6 : 5}
          xs={detailsUsers ? 24 : 8}
          sm={8}
          md={4}
          lg={6}
        >
          {detailsGroup || detailsUsers ? (
            <>
              <Skeleton.Button active className={classes.btn_skeleton} />

              <Skeleton.Button active className={classes.btn_skeleton} />
            </>
          ) : (
            <Skeleton.Button active className={classes.btn_skeleton} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserCardSkeleton;
