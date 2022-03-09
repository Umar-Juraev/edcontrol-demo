import { FC } from "react";
import toast from "react-hot-toast";
import { Layout, Row } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import { DropDown } from "components/shared";
import { NotificationIcon } from "components/svg";
import AutoComplete from "./_components/AutoComplete";
import { useHistory, useLocation } from "react-router-dom";


import classes from "./Header.module.scss";

const { Header } = Layout;

type Props = {
  hide: boolean;
  setHide: (e: boolean) => void;
};

const LayoutHeader: FC<Props> = ({ hide, setHide }) => {
  const history= useHistory()

  const onLogout = async () => {
    await toast.success("tizimdan chiqildi");
    await setTimeout(() => {
      history.push('/login')
    }, 500);
  };

  const location = useLocation()

  return (
    <Header className={classes.header}>
      <div className={classes.btn_close} onClick={() => setHide(!hide)}>
        <MenuOutlined className={classes.close} />
      </div>
      <Row
        justify={(location.pathname !== `/admin/groups` &&
          location.pathname !== `/admin/teachers` &&
          location.pathname !== `/admin/students`) ? 'space-between' : 'end'}
        align="middle"
        wrap={false}
        className={classes.nav}
      >
        {(location.pathname !== `/admin/groups` &&
          location.pathname !== `/admin/teachers` &&
          location.pathname !== `/admin/students`) &&
          <Row align="middle">
            <AutoComplete />
          </Row>
        }
        <Row align="middle" justify="end" wrap={false}>
          <div className={classes.notificationCont}>
            <NotificationIcon />
          </div>
          <DropDown
            onLogout={onLogout}
            item={{
              img: '',
              full_name: 'test user'
            }}
          />
        </Row>
      </Row>
    </Header>
  );
};

export default LayoutHeader;
