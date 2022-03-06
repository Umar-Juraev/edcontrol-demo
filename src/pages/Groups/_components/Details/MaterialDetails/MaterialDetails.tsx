import { Row, Col } from "antd";
import { useParams, useLocation } from "react-router-dom";

import { BreadCrumb } from "components/shared";
import { useCourseByIdQuery, useGroupByIdQuery, useMaterialByIdQuery } from "store/endpoints";

import classes from "./MaterialDetails.module.scss";

const MaterialDetails = () => {
  const { id } = useParams<{ id: any }>();
  const { pathname } = useLocation();
  let groupId = +pathname.split("/")[3];
  let courseId = +pathname.split("/")[4];

  const { data: materialByIdQuery, isFetching } = useMaterialByIdQuery({ id });
  const { data: groupData } = useGroupByIdQuery({ id: groupId });
  const { data: courseData } = useCourseByIdQuery({ id: courseId });

  const breadCrumb = [
    {
      id: 1,
      title: pathname.includes(`settings/course`) ? "Kurslar" : "Guruhlar",
      path: pathname.includes(`settings/course`) ? "/admin/settings?tab=3" : "/admin/groups"
    },
    {
      id: 2,
      title: pathname.includes(`settings/course`) ? `${courseData?.name}` : `${groupData?.name}`,
      path: pathname.includes(`settings/course`)
        ? `/admin/settings/course/${courseId}`
        : `/admin/groups/${groupId}`
    },
    { id: 3, title: `${materialByIdQuery?.title}` },
  ];

  return (
    <div>
      <Row>
        <Col span={24}>
          <BreadCrumb breadCrumb={breadCrumb} isFetching={isFetching} />
        </Col>
      </Row>
      <div className={classes.material_details}>
        <h2>{materialByIdQuery?.title}</h2>
        <p>{materialByIdQuery?.body}</p>
      </div>
    </div>
  );
};

export default MaterialDetails;
