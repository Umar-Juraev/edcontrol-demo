import { Col, Row } from 'antd';

import { BreadCrumb, Button, CheckBox, FormElements, Loader, Pagination } from 'components/shared';
import { SelectUserIcon } from 'components/svg';
import userImage from "images/group-teacher-photo.png";

import classes from './NewMessage.module.scss';
import { studentAPI } from 'fakeAPI/fakeAPI';
import { useState } from 'react';

export type Props = {};

const NewMessage = (props: Props) => {
    const [checkedAll, setCheckedAll] = useState<boolean>(false)
    const breadCrumb = [
        { id: 1, title: "Message history", path: "/admin/settings" },
        { id: 2, title: "New message" },
    ];

    return (
        <div className={classes.wrapper}>
            <Row>
                <Col span={24}>
                    <BreadCrumb breadCrumb={breadCrumb} />
                </Col>
            </Row>

            <Row gutter={20} justify="space-between">
                <Col className={classes.newMessageCard} span={10}>
                    <div>
                        <h3 className={classes.title}>New message</h3>
                        <FormElements.TextArea
                            placeholder="type new message"
                            rows={10}

                            maxLength={160}
                        />
                        <Button
                            type="primary"
                            size="large"
                            fullWidth
                        >
                            Send message
                        </Button>
                    </div>
                </Col>

                <Col className={classes.studentsCard} span={14}>
                    <Row className={classes.studentHeaderCard} >
                        <Col className={classes.studentTitle} span={14}>
                            <span className={classes.title}>Talabalar</span>
                        </Col>
                        <Col >
                            <Button onClick={() => setCheckedAll(!checkedAll)} icon={<SelectUserIcon />} iconMode>
                                {checkedAll ?
                                    'Uncheck all' : 'check all'
                                }
                            </Button>
                        </Col>
                    </Row>

                    {studentAPI.results.map((item) => (
                        <Row key={item.id} className={classes.usersCard}>
                            <Col className={classes.userInfoSection}>
                                <img src={item.photo?.file ?? userImage} alt="" />
                                <span>{item.full_name}</span>
                            </Col>

                            <Col className={classes.checkboxSection}>
                                <CheckBox
                                    value={item.id}
                                    checked={checkedAll}
                                />
                            </Col>
                        </Row>
                    ))}
                    <div className={classes.pagination_wrapper}>
                        <Pagination
                            total={studentAPI.count}
                            pageSize={10}
                        />
                    </div>
                </Col>
            </Row >
        </div >
    );
}

export default NewMessage;