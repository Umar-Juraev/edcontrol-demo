import { Card, Col, Row, Skeleton } from 'antd';
import React from 'react';

import classes from './GlobalSearchSkeleton.module.scss';

export type Props = {};

const GlobalSearchSkeleton = (props: Props) => {
    return (
        <Col>
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
                <Row justify='space-between' align='middle' wrap={false}>
                    <Col span={5}>
                        <Skeleton
                            paragraph={{ rows: 0 }}
                            active
                            className={classes.title}
                        />
                    </Col>
                    <Col span={5}>
                        <Skeleton
                            paragraph={{ rows: 0 }}
                            active
                            className={classes.title}
                        />
                    </Col>
                </Row>

                <Col span={12} className={classes.textCont}>
                    <Skeleton
                        paragraph={{ rows: 0 }}
                        active
                        className={classes.text}
                    />               
                    <Skeleton
                        paragraph={{ rows: 0 }}
                        active
                        className={classes.text}
                    />                 
                     <Skeleton
                    paragraph={{ rows: 0 }}
                    active
                    className={classes.text}
                />
                </Col>
            </Card>

        </Col>
    );
}

export default GlobalSearchSkeleton;



