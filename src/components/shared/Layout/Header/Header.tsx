import { FC } from "react";
import toast from "react-hot-toast";
import { Layout, Row } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import { DropDown } from "components/shared";
import { NotificationIcon } from "components/svg";
import { useAppSelector } from "store/hooks";
import BranchImage from "images/BranchImage.png";
import manImage from "images/group-teacher-photo.png";
import womanImage from "images/woman-image.jpg";
import AutoComplete from "./_components/AutoComplete";
import { useHistory, useLocation } from "react-router-dom";


import classes from "./Header.module.scss";

const { Header } = Layout;

type Props = {
  hide: boolean;
  setHide: (e: boolean) => void;
};

const LayoutHeader: FC<Props> = ({ hide, setHide }) => {
  // const { currentUser } = useAppSelector((state) => state.persistedData);
  // const [width, setWidth] = useState(window.innerWidth);
  const history= useHistory()

  const onLogout = async () => {
    await localStorage.removeItem("token");
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
          {/* <DropDown
            onLogout={onLogout}
            item={{
              img: currentUser.data?.photo
                ? currentUser.data?.photo?.file
                : currentUser.data?.gender === "male"
                  ? manImage
                  : womanImage,
              full_name: currentUser.data?.full_name,
            }}
          /> */}
          {/* <DropDown
            onLogout={onLogout}
            item={{
              img: currentUser.data?.branch?.photo
                ? currentUser.data?.branch?.photo.file
                : BranchImage,
              full_name: currentUser.data?.branch.name,
            }}
            stayStatic
          /> */}
        </Row>
      </Row>
    </Header>
  );
};

export default LayoutHeader;
