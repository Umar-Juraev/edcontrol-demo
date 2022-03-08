import { Col, Row } from "antd";

import { Loader, Pagination } from "components/shared";
import { GroupCard } from "components/Cards";

import GroupCardSkeleton from "components/Skeleton/GroupCardSkeleton";
import { groupsAPI } from "fakeAPI/fakeAPI";

export type Props = {};

const TeacherGroups = (props: Props) => {
  return (
    <div>
      <Loader spinning={false}>
        <Row
          gutter={[{ sm: 0, md: 5, lg: 20 }, 20]}
        >
          {groupsAPI.results.length <= 0 && (
            <>
              <GroupCardSkeleton lengthParagraph={5} />
              <GroupCardSkeleton lengthParagraph={5} />
              <GroupCardSkeleton lengthParagraph={5} />
            </>
          )}
          {groupsAPI.results.slice(3, 5).map((group) => (
            <Col key={group.id} sm={24} md={12} lg={12} xl={8} xxl={6}>
              <GroupCard
                photo={group.photo?.file}
                href={`/admin/groups/${group.id}`}
                name={group.name}
                teacher={group.teacher.full_name}
                days={group.days}
                startTime={group.lesson_start_time}
                startDate={group.lessons_start_date}
                endDate={group.lessons_end_date}
                room={group.room.name}
                userCount={group.pupils_count}
              />
            </Col>
          ))}
        </Row>

        {groupsAPI.results.length <= 3 &&
          <Row justify="end" >
            <Pagination
              total={groupsAPI.count}
              pageSize={10}
            />
          </Row>
        }
      </Loader>
    </div>
  );
};

export default TeacherGroups;
