import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import { BreadCrumb, Button, CheckBox, FormElements, Loader, Pagination } from 'components/shared';
import { SelectUserIcon } from 'components/svg';
import { useCreatePostMutation, useStudentsQuery } from 'store/endpoints';
import { UsersDTO } from 'types';
import userImage from "images/group-teacher-photo.png";

import classes from './NewMessage.module.scss';
import toast from 'react-hot-toast';

export type Props = {};

const NewMessage = (props: Props) => {
    const [text, setText] = useState<string>('')
    const [checkedUsers, setCheckedUsers] = useState<number[]>([])
    const [checkedAll, setCheckedAll] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1);

    const studentsQuery = useStudentsQuery({ is_removed: false, page });
    const [createPostMutation, { isLoading }] = useCreatePostMutation();

    const handleChangePage = (page: number) => {
        setPage(page);
    }

    const handleChangeCheck = (e: CheckboxChangeEvent, item: UsersDTO) => {
        const { checked, value } = e.target
        if (!checked) {
            setCheckedUsers(checkedUsers.filter((f) => f !== value))
        } else {
            setCheckedUsers([...checkedUsers, value])
        }
    }

    const handlePost = () => {
        const values = {
            receivers: checkedUsers,
            text: text
        }
        const mutationPromise = createPostMutation(values).unwrap();

        toast
            .promise(mutationPromise, {
                loading: `xabar yuborilmoqda...`,
                success: `muvaffaqqiyatli yuborildi`,
                error: ({ data }) => JSON.stringify(data),
            })
    }

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
                        {text.length === 160 && <span className={classes.errorText}>Matn uzunligi 160 ta belgidan uzun bo'lmasligi kerak!</span>}
                        <FormElements.TextArea
                            placeholder="Yangi xabaringizni yozing"
                            rows={10}
                            value={text}
                            maxLength={160}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <Button
                            type="primary"
                            size="large"
                            fullWidth
                            loading={isLoading}
                            onClick={handlePost}
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

                    <Loader
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
                    </Loader>
                    <div className={classes.pagination_wrapper}>
                        <Pagination
                            total={studentsQuery.data?.count}
                            pageSize={10}
                            current={page}
                            onChange={handleChangePage}
                        />
                    </div>
                </Col>
            </Row >
        </div >
    );
}

export default NewMessage;