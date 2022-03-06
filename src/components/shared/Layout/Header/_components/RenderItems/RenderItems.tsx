import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { ArrowRight } from "components/svg";
import { Link, useHistory } from "react-router-dom";
import GroupCards from "images/group-photo.png";
import GlobalSearchSkeleton from "components/Skeleton/GlobalSearchSkeleton";
import "../AutoComplete/AutoComplete.scss";


type Info = {
    text?: string,
    icon?: any,
}

type Item = {
    type: string;
    name: string;
    img: string;
    id: number
    info?: Info[]
}

type Props = {
    data: Item[] | undefined;
    isFetching: boolean;
    setVisible: (bool: boolean) => void
}
const RenderItem = ({ data, isFetching, setVisible }: Props) => {
    const [title, setTitle] = useState({
        title: '',
        path: ''
    })
    const history = useHistory()



    const handleClick = (item: Item) => {
        setVisible(false)
        if (item.type === 'teacher') {
            history.push(`/admin/teachers/${item.id}`)
        }
        if (item.type === 'group') {
            history.push(`/admin/groups/${item.id}`)
        }
        if (item.type === 'courses') {
            history.push(`/admin/settings/course/${item.id}`)
        }
        if (item.type === 'rooms') {
            history.push(`/admin/rooms`)
        }
        if (item.type === 'users') {
            history.push(`/admin/students/${item.id}`)
        }

    }

    useEffect(() => {
        data?.map(item => {
            if (item.type === 'teacher') {
                setTitle({
                    title: 'O\'qituvchilar',
                    path: '/admin/teachers'
                })
            }
            if (item.type === 'group') {
                setTitle({
                    title: 'Guruhlar',
                    path: '/admin/groups'
                })
            }
            if (item.type === 'courses') {
                setTitle({
                    title: 'Kurslar',
                    path: '/admin/settings?tab=3'
                })
            }
            if (item.type === 'rooms') {
                setTitle({
                    title: 'Xonalar',
                    path: '/admin/rooms'
                })
            }
            if (item.type === 'users') {
                setTitle({
                    title: 'O\'quvchilar',
                    path: '/admin/students'
                })
            }
        })
    }, [isFetching])


    return (
        <Col className="autoComplete__item">
            {!isFetching && data?.length !== 0 &&
                <Col>
                    <h3 className="autoComplete__item__title">{title.title}</h3>
                    <Row
                        wrap={false}
                        onClick={() => setVisible(false)}
                        align="middle"
                        gutter={5}
                        className="autoComplete__item__link"
                    >
                        <Link to={`${title.path}`}>barchasi </Link>
                        <ArrowRight />
                    </Row>
                </Col>
            }
            {
                !isFetching ?
                    data?.slice(0, 3)?.map((item: Item, i) => {
                        return (
                            <Row key={i} wrap={false} onClick={() => handleClick(item)} className="autoComplete__item__box">
                                <Col >
                                    <div className={`autoComplete__item__img
                                     ${(item.type === 'group'
                                            || item.type === 'rooms'
                                            || item.type === 'courses') && 'bigger'}  `}>
                                        <img src={item.img || GroupCards} alt={item.name} />
                                    </div>
                                </Col>
                                <Col >
                                    <h4>{item.name}</h4>
                                    {item?.info?.map(el => (
                                        <Row wrap={false} align="middle" className="autoComplete__item__info">
                                            <div className="icon">{el.icon}</div>
                                            <div>{el.text}</div>
                                        </Row>
                                    ))}
                                </Col>
                            </Row>
                        );
                    })
                    :
                    <Col>
                        <GlobalSearchSkeleton />
                    </Col>
            }
        </Col >
    );
};

export default RenderItem