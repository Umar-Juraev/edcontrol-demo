import { FC, useState } from "react";
import { Form, Row, Col } from "antd";

import { PasswordIcon } from "components/svg";
import { Button, FormElements } from "components/shared";
import Logo from "assets/ed-control-logo-text.svg";

import classes from "./Login.module.scss";
import { useHistory } from "react-router-dom";


const Login: FC = (props) => {
  const history = useHistory()


  const onFinish = (values: any) => {
      history.push('/admin/home')
  };
  return (
    <>
      <Row>
        <Col span={9} className={classes.leftSection}>
          <img className={classes.logo} src={Logo} alt="LOGO" />
        </Col>

        <Col span={15} className={classes.rightSection}>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            className={classes.form}
          >
            <h1>Login</h1>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="phone"
                  rules={[{ required: true, message: "phone number is required" }]}
                >
                  <FormElements.PhoneInput style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "password is required" }]}
                >
                  <FormElements.Input
                    prefix={<PasswordIcon />}
                    isPassword
                    placeholder="enter password"
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item>
                  <Button
                    type="ghost"
                    htmlType="submit"
                    size="large"
                    loading={false}
                    fullWidth
                  >
                              Just click to enter

                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
