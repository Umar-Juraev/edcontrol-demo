import { useState } from 'react';
import { Col, Row } from 'antd';
import { BreadCrumb, Pagination } from 'components/shared';
import UserCardInfo from 'components/Cards/UserCardInfo';
import { useHistory } from 'react-router-dom';
import { postsAPI } from 'fakeAPI/fakeAPI';

export type Props = {};

const MessageHistory = (props: Props) => {
    const [page, setPage] = useState(1);
    const history = useHistory()


    function onChange(page: number) {
        setPage(page)
        history.push(`/admin/settings/student-messages?page=${page}`);
    }

    const breadCrumb = [
        { id: 1, title: "Message history", path: "/admin/settings" },
        { id: 2, title: "Students" },
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
                    postsAPI.results.map((item) => (
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
                            setUpdateModal={() => { }}
                        />
                    ))

                }
            </Row>

            <Row justify="end" >
                <Pagination
                    total={postsAPI.count}
                    pageSize={10}
                    current={page}
                    onChange={onChange}
                />

            </Row>
        </div>
    );
}

export default MessageHistory;