import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import { BreadCrumb, Button, CheckBox, FormElements, Loader, Pagination } from 'components/shared';
import { SelectUserIcon } from 'components/svg';
import userImage from "images/group-teacher-photo.png";

import classes from './NewMessage.module.scss';
import toast from 'react-hot-toast';

export type Props = {};

const NewMessage = (props: Props) => {
    // const studentsQuery = useStudentsQuery({ is_removed: false, page });




    const breadCrumb = [
        { id: 1, title: "Xabarlar tarixi", path: "/admin/settings" },
        { id: 2, title: "Yangi xabar" },
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
                        <h3 className={classes.title}>Yangi xabar</h3>
                        <FormElements.TextArea
                            placeholder="Yangi xabaringizni yozing"
                            rows={10}
               
                            maxLength={160}
                        />
                        <Button
                            type="primary"
                            size="large"
                            fullWidth
                        >
                            Xabar jo'natish
                        </Button>
                    </div>
                </Col>

                <Col className={classes.studentsCard} span={14}>
                    <Row className={classes.studentHeaderCard} >
                        <Col className={classes.studentTitle} span={14}>
                            <span className={classes.title}>Talabalar</span>
                        </Col>
                        <Col >
                            <Button icon={<SelectUserIcon />} iconMode>
                                Hammasini belgilash
                            </Button>
                        </Col>
                    </Row>

                    {/* <Loader
                        spinning={studentsQuery.isFetching}
                        style={studentsQuery.isFetching ? { marginTop: 50 } : undefined}
                    >
                        {studentsQuery.data?.results.map((item) => (
                            <Row key={item.id} className={classes.usersCard}>
                                <Col className={classes.userInfoSection}>
                                    <img src={item.photo?.file ?? userImage} alt="" />
                                    <span>{item.full_name}</span>
                                </Col>

                                <Col className={classes.checkboxSection}>
                                    <CheckBox
                                        value={item.id}
                                        onChange={(e: CheckboxChangeEvent) => handleChangeCheck(e, item)} />
                                </Col>
                            </Row>
                        ))}
                    </Loader> */}
                    {/* <div className={classes.pagination_wrapper}>
                        <Pagination
                            total={studentsQuery.data?.count}
                            pageSize={10}
                            current={page}
                            onChange={handleChangePage}
                        />
                    </div> */}
                </Col>
            </Row >
        </div >
    );
}

export default NewMessage;