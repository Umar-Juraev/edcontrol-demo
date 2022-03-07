import { Col, Row } from "antd";

import { useMainPageStatisticsQuery, useStudentsFullQuery, useStudentsQuery } from "store/endpoints";
import { GroupCard } from "components/Cards";
import CardStats from "components/Cards/CardStats";
import UsersCard from "components/Cards/UsersCard/UsersCard";
import GroupIcon from "images/icon.svg";
import StudentIcon from "images/icon-student.svg";
import TeacherIcon from "images/icon-teacher.svg";
import ClientIcon from "images/icon-client.svg";
import Income from "images/income.svg";

import { Empty } from "components/shared";
import CardStatsSkeleton from "components/Skeleton/CardStatsSkeleton";
import GroupCardSkeleton from "components/Skeleton/GroupCardSkeleton";

import classes from "./Home.module.scss";
import { useEffect } from "react";

export type Props = {};

const Home = (props: Props) => {
  // const statisticsQuery = useMainPageStatisticsQuery();
  // const studentsQuery = useStudentsFullQuery()

  const cardData = [
    {
      title: `Groups`,
      icon: GroupIcon,
      value: '50',
      path: "/admin/groups",
      col: 6,
    },
    {
      title: `Teachers`,
      icon: StudentIcon,
      value: '120',
      path: "/admin/teachers",
      col: 6,
    },
    {
      title: `Talabalar`,
      icon: TeacherIcon,
      value: '600',
      path: "/admin/students",
      col: 6,
    },
    {
      title: `Clients`,
      icon: ClientIcon,
      value: '300',
      path: "/admin/clients",
      col: 6,
    }, {
      title: `Debtors`,
      icon: Income,
      value: '30',
      path: "/admin/finance?tab=5",
      col: 7,
    },
  ];


  // useEffect(() => {
  //   fetch('db.json').then(res => console.log(res)
  //   )
  // }, [])


  return (
    <div className={classes.home_page}>
      <h2 className={classes.page_title}>General Statistics</h2>
      <div className={classes.card_stats_container}>
        {/* {statisticsQuery.isFetching && (
          <div className={classes.statusBox}>
            <CardStatsSkeleton />
            <CardStatsSkeleton />
            <CardStatsSkeleton />
            <CardStatsSkeleton />
            <CardStatsSkeleton />
          </div>
        )} */}

        <div className={classes.statusBox}>
          {
            // !statisticsQuery.isFetching &&
            cardData?.map(({ title, value, icon, path }) => (
              <CardStats
                image={icon}
                value={value}
                types={title}
                // isLoading={statisticsQuery.isLoading}
                pathName={path}
              />
            ))}
        </div>
      </div>

      <div className={classes.active_groups}>
        <h2 className={classes.active_groups_title}>Active groups</h2>
        <Row
          gutter={[{ sm: 0, md: 5, lg: 20 }, 20]}
          style={{ margin: "24px 0 0 0" }}
        >
          {/* {statisticsQuery.isFetching && (
            <>
              <GroupCardSkeleton lengthParagraph={5} />
              <GroupCardSkeleton lengthParagraph={5} />
              <GroupCardSkeleton lengthParagraph={5} />
            </>
          )} */}
          {/* {statisticsQuery.data?.groups.length
            ? statisticsQuery.data?.groups.slice(0, 3).map((group) => (
              <Col key={group.id} sm={24} md={12} lg={12} xl={8} xxl={6}>
                <GroupCard
                  href={`/admin/groups/${group.id}`}
                  name={group.name}
                  teacher={group.teacher.full_name}
                  days={group.days}
                  startTime={group.lesson_start_time}
                  startDate={group.lessons_start_date}
                  endDate={group.lessons_end_date}
                  room={group.room.name}
                  userCount={group.pupils_count}
                // badge={{
                //   title: group?.lesson?.name,
                //   background: colorGenerator(group?.lesson?.id),
                // }}
                />
              </Col>
            ))
            : !statisticsQuery.isLoading && (
              <Col span={24}>
                <Empty description="Faol guruhlar mavjud emas" />
              </Col>
            )} */}
        </Row>
      </div>

      <div className={classes.active_groups}>
        <h2 className={classes.active_groups_title}>
          The best teachers
        </h2>
        <Row
          gutter={[{ sm: 0, md: 5, lg: 20 }, 20]}
          style={{ margin: "24px 0 0 0" }}
        >
          {/* {statisticsQuery.data?.teachers.length
            ? statisticsQuery.data?.teachers.slice(0, 3).map((item) => (
              <Col key={item.id} sm={24} md={12} lg={12} xl={8} xxl={6}>
                <UsersCard
                  name={item.full_name}
                  groupsCount={item.groups_count}
                  phoneNumber={item.phone_number}
                  pathname={item.id}
                />
              </Col>
            ))
            : !statisticsQuery.isLoading && (
              <Col sm={24} md={12} lg={12} xl={8} xxl={6}>
                <Empty description="Ma'lumot yo'q" />
              </Col>
            )} */}
        </Row>
      </div>
    </div>
  );
};

export default Home;
