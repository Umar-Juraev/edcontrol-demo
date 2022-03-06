import CourseDetails from "pages/Settings/_pages/CourseDetails";
import { lazy } from "react";
import { RouteProps } from "react-router-dom";

const HomePage = lazy(() => import("pages/Home"));
const GroupsPage = lazy(() => import("pages/Groups/_pages/GroupsHome"));
const GroupsDetailsPage = lazy(
  () => import("pages/Groups/_pages/GroupsDetails")
);
const MaterialDetails = lazy(
  () =>
    import("pages/Groups/_components/Details/MaterialDetails/MaterialDetails")
);
const TeachersPage = lazy(() => import("pages/Teachers/_pages/TeacherHome"));
const TeacherDetailsPage = lazy(
  () => import("pages/Teachers/_pages/TeacherDetails")
);
const StudentsPage = lazy(() => import("pages/Students/_pages/StudentHome"));
const StudentDetailsPage = lazy(
  () => import("pages/Students/_pages/StudentDetails")
);
const FinancePage = lazy(() => import("pages/Finance"));
const RoomsPage = lazy(() => import("pages/Rooms"));
const SettingsPage = lazy(() => import("pages/Settings"));
const NewMessage = lazy(
  () => import("pages/Settings/_pages/Messages/NewMessage")
);
const MessageHistoryStudents = lazy(
  () => import("pages/Settings/_pages/Messages/MessageHistoryStudents")
);
const ClientsPage = lazy(() => import("pages/Clients"));

const routes: RouteProps[] = [
  { path: `/admin`, exact: true, component: HomePage },
  { path: `/admin/home`, exact: true, component: HomePage },

  // { path: `/admin/groups`, exact: true, component: GroupsPage },
  // { path: `/admin/groups/:id`, exact: true, component: GroupsDetailsPage },
  // { path: `/admin/groups/:groupId/materials/:id`, exact: false, component: MaterialDetails },

  // { path: `/admin/teachers`, exact: true, component: TeachersPage },
  // { path: `/admin/teachers/:id`, exact: false, component: TeacherDetailsPage },

  // { path: `/admin/students/`, exact: true, component: StudentsPage },
  // { path: `/admin/students/:id`, exact: false, component: StudentDetailsPage },

  // { path: `/admin/rooms`, exact: true, component: RoomsPage },
  // { path: `/admin/finance`, exact: true, component: FinancePage },

  // { path: `/admin/clients`, exact: true, component: ClientsPage },

  // { path: `/admin/settings`, exact: true, component: SettingsPage },
  // { path: `/admin/settings/student-messages`, exact: true, component: MessageHistoryStudents },
  // { path: `/admin/settings/new-message`, exact: true, component: NewMessage },
  // { path: `/admin/settings/course/:id`, exact: true, component: CourseDetails },
  // { path: `/admin/settings/course/:courseId/materials/:id`, exact: false, component: MaterialDetails },
];

export default routes;
