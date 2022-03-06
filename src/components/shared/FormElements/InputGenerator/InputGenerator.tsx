import React, { FC } from "react";
import { Col, Form, Row, FormItemProps } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

import { Button } from "components/shared";
import { AddIcon } from "components/svg";

type Props = {
  name: string;
  label: string;
  keyName: string;
  buttonName: string;
  initialValue?: any;
  withoutMinus?: boolean;
  withoutAdd?: boolean;
  formProps?: FormItemProps;
};

const InputGenerator: FC<Props> = ({
  name,
  label,
  keyName,
  buttonName,
  initialValue,
  withoutMinus,
  withoutAdd,
  formProps,
  children,
}) => {
  return (
    <>
      <Form.List name={name} initialValue={initialValue}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row key={key} align="middle" gutter={10}>
                <Col span={23}>
                  <Form.Item
                    {...restField}
                    label={label}
                    name={[name, keyName]}
                    {...formProps}
                  >
                    {children}
                  </Form.Item>
                </Col>
                <Col span={1}>
                  {!withoutMinus && (
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  )}
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Row justify="center">
                {!withoutAdd && (
                  <Button
                    addMode
                    fullWidth
                    size="large"
                    icon={<AddIcon />}
                    onClick={() => add()}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {buttonName}
                  </Button>
                )}
              </Row>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default InputGenerator;
