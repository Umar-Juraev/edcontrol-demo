import { Layout } from "antd";
import  { FC, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import LayoutHeader from "./Header/Header";
import classes from "./Layout.module.scss";

const { Content } = Layout;

const PageLayout: FC = ({ children }) => {
  const [hide, setHide] = useState<boolean>(false);
  const [width, setWidth] = useState(window.innerWidth);
  
  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
  };


  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    if (width <= 1025) {
      setHide(true);
    } else {
      setHide(false);
    }
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  }, [width]);  

  return (
    <Layout>
      <Sidebar hide={hide} />
      <Layout>
        <LayoutHeader  hide={hide} setHide={setHide} />
        <Content className={classes.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
