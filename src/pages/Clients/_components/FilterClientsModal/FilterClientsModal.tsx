import { FC, useState } from "react";
import {
  Modal,
  Button,
  FormElements,
  FilterUsersCarousel,
} from "components/shared";
import { Col, Row, Form } from "antd";
import { useAppDispatch } from "store/hooks";


export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const FilterClientsModal: FC<Props> = ({ visible, setVisible }) => {
  const dispatch = useAppDispatch();
  const [selectedDirection, setSelectedDirection] =
    useState<any | null>();
  const [selectedClient, setSelectedClient] = useState<any | null>();



  return (
    <Modal
      title="Filter qilish"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form  layout="vertical">
        <FilterUsersCarousel
          title="Yo`nalishlar:"
          type="direction"
          selectedDirection={selectedDirection}
          setSelectedDirection={setSelectedDirection}
          setSelectedStudent={setSelectedClient}
        />
        <br />
        <Form.Item name="source" label="Manba">
          <FormElements.Select
            showSearch
           
          />
        </Form.Item>

        {/* <Row align="bottom" gutter={8}>
          <Col span={12}>
            <Form.Item name="date_add_start" label="Davomiyligi:">
              <FormElements.DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="date_add_end">
              <FormElements.DatePicker />
            </Form.Item>
          </Col>
        </Row> */}

        <Form.Item name="status" label="Holat">
          <FormElements.Select
            showSearch
          
          />
        </Form.Item>

        <Row gutter={8}>
          <Col span={12}>
            <Button danger fullWidth size="large" >
              Qaytarish
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              htmlType="submit"
              fullWidth
              size="large"

            >
              Saqlash
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FilterClientsModal;
