import { useState } from 'react';
import { Col, Row } from 'antd';

import { BreadCrumb, Empty, Pagination } from 'components/shared';
import UserCardInfo from 'components/Cards/UserCardInfo';

import { usePostsQuery } from 'store/endpoints';
import { useHistory } from 'react-router-dom';
import classes from './MessageHistory.module.scss';

export type Props = {};

const MessageHistory = (props: Props) => {
    const [page, setPage] = useState(1);
    // const history = useHistory()

    const postsQuery = usePostsQuery({ page })

    function onChange(page: number) {
        setPage(page)
        // history.push(`/admin/settings/student-messages?page=${page}`);
    }

    const breadCrumb = [
        { id: 1, title: "Xabarlar tarixi", path: "/admin/settings" },
        { id: 2, title: "Talabalar" },
    ];
;
    
    return (
        <div>
            <Row>
                <Col span={24}>
                    <BreadCrumb breadCrumb={breadCrumb} />
                </Col>
            </Row>

            <Row gutter={[0, 10]}>
                {
                    postsQuery.data?.count ?
                        postsQuery.data?.results.map((item) => (
                            <UserCardInfo
                                key={item.id}
                                fullName={`${item.student.full_name}`}
                                birthDay={item.student.birth_date}
                                gender={item.student.gender}
                                groupsCount={item.student.groups_count}
                                price={item.student.balance}
                                location={item.student.district.name}
                                pathname={`/admin/students/${item.student.id}`}
                                phone={item.student.phone_number}
                                image={item.student.photo?.file}
                                setUpdateModal={() => { }}
                            />
                        ))
                        : (
                            !postsQuery.isLoading && <Col span={24}>
                                <Empty description="Talabalar mavjud emas" />
                            </Col>
                        )
                }
            </Row>
            {!postsQuery.isLoading && (
                <Row justify="end" style={{ marginTop: 10 }}>
                    <Pagination
                        total={postsQuery.data?.count}
                        pageSize={10}
                        current={page}
                        onChange={onChange}
                    />
                </Row>
            )}
        </div>
    );
}

export default MessageHistory;