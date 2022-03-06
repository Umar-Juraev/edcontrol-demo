import { FC, useEffect, useState } from "react";
import { Layout } from "antd";
import { Link, NavLink, useLocation } from "react-router-dom";

import {
  HomeIcon,
  GroupIcon,
  TeacherIcon,
  StudentIcon,
  FinanceIcon,
  RoomIcon,
  SettingsIcon,
  ClientsIcon
} from "components/svg";
import Logo from "assets/ed-control-logo-text.svg";

import classes from "./Sidebar.module.scss";
// import { useAppSelector } from "store/hooks";

const { Sider } = Layout;

type Props = {
  hide: boolean;
};

const Sidebar: FC<Props> = ({ hide }) => {
  const location = useLocation();
  const [width, setWidth]   = useState(window.innerWidth);
  // const { currentUser } = useAppSelector(state => state.persistedData)
  
  const menuItems = [
    {
      key: 1,
      label: `Bosh sahifa`,
      icon: (
        <HomeIcon
          color={location.pathname === "/admin/home" ? "#377DFF" : "#B0B7C3"}
        />
      ),
      path: "/admin/home",
    },
    {
      key: 2,
      label: `Guruhlar`,
      icon: (
        <GroupIcon
          color={
            location.pathname.includes("/admin/groups") ? "#377DFF" : "#B0B7C3"
          }
        />
      ),
      path: "/admin/groups",
    },
    {
      key: 3,
      label: `O'qituvchilar`,
      icon: (
        <TeacherIcon
          color={
            location.pathname.includes("/admin/teachers")
              ? "#377DFF"
              : "#B0B7C3"
          }
        />
      ),
      path: "/admin/teachers",
    },
    {
      key: 4,
      label: `Talabalar`,
      icon: (
        <StudentIcon
          color={
            location.pathname.includes("/admin/students")
              ? "#377DFF"
              : "#B0B7C3"
          }
        />
      ),
      path: "/admin/students",
    },
    {
      key: 5,
      label: `Moliya`,
      icon: (
        <FinanceIcon
          color={
            location.pathname.includes("/admin/finance")
              ? "#377DFF"
              : "#B0B7C3"
          }
        />
      ),
      path: "/admin/finance",
    },
    {
      key: 8,
      label: `Xonalar`,
      icon: (
        <RoomIcon
          color={
            location.pathname.includes("/admin/rooms") ? "#377DFF" : "#B0B7C3"
          }
        />
      ),
      path: "/admin/rooms",
    },
    {
      key: 9,
      label: `Mijozlar`,
      icon: (
        <ClientsIcon
          color={
            location.pathname.includes("/admin/clients") ? "#377DFF" : "#B0B7C3"
          }
        />
      ),
      path: "/admin/clients",
    }
  ];

  const updateDimensions = () => {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
  }, []); 
  return (
    <Sider
      width="250px"
      collapsedWidth={70}
      trigger={null}
      collapsed={hide}
      className={classes.sidebar}
      theme="light"
      collapsible
    >
      {!hide && (
        <Link to="/" className={classes.logo}>
          <img src={Logo} alt="" />
        </Link>
      )}

      <ul className={classes.menu}>
        <div>
          {menuItems?.map(({ icon, key, label, path }) => (
            <NavLink
              exact
              key={key}
              to={path}
              style={{ width: hide ? "auto" : "200px" }}
              className={(isActive) =>
                location.pathname.includes(path) || isActive
                  ? `${classes.link} ${classes.active}`
                  : classes.link
              }
            >
              <span>{icon}</span>
              {!hide && <li className={classes.li}>{label}</li>}
            </NavLink>
          ))}
        </div>

          <NavLink
            exact
            to="/admin/settings?tab=1"
            style={{ width: hide ? "auto" : "200px" }}
            className={(isActive) =>
              location.pathname.includes("/admin/settings") || isActive
                ? `${classes.link} ${classes.active}`
                : classes.link
            }
          >
            <span>
              <SettingsIcon color={location.pathname.includes("/admin/settings") ? "#377DFF" : "#B0B7C3"} />
            </span>
            {!hide && <li className={classes.li}>Sozlamalar</li>}
          </NavLink>
        
        <span className={classes.innerWidth}>{`${width} px`}</span>
      </ul>
    </Sider>
  );
};

export default Sidebar;
