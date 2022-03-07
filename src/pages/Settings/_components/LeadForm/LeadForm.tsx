import toast from "react-hot-toast";
import { Form, Col, Row } from "antd"
import { useHistory } from "react-router-dom";

import { EditIcon, UserIcon } from "components/svg";
import { FormElements, Button } from "components/shared";
import { checkObjectValueExist, parsePhoneNumber } from "utils";
import { useAppSelector } from "store/hooks";

import classes from "./LeadForm.module.scss";

const LeadForm = () => {
  const { currentUser } = useAppSelector((state) => state.persistedData);
  const history = useHistory()

  // const source = useSourcesQuery();
  // const directions = useDirectionsQuery();
  // const status = useStatusesQuery();

  // const onFinish = (values: any) => {

  //   const clientValues = {
  //     ...values,
  //     phone_number: parsePhoneNumber(values.phone_number),
  //     branch: currentUser.data?.branch?.id,
  //   };
  //   checkObjectValueExist(clientValues);

  //   const mutationPromise = createMutation(clientValues).unwrap();
  //   toast
  //     .promise(mutationPromise, {
  //       loading: `mijoz qo'shilmoqda...`,
  //       success: `muvaffaqqiyatli qo'shildi`,
  //       error: ({ data }) => JSON.stringify(data),
  //     })
  //     .then(() =>history.push('/admin/clients'))
  // };

  return (
    <section className={classes.lead_form}>
      <div className={classes.form_header}>
        <div className={classes.form_description}>
          <h2>O'quv markaziga murojaat qiling</h2>
          <p>
            Agar siz zamonaviylardan birini o'zlashtirmoqchi bo'lsangiz va
            yuqori maoshli kasblar, quyidagi shaklni to'ldiring va biz tez orada
            siz bilan bog'lanamiz!
          </p>
        </div>
        <Button icon={<EditIcon />} size="large" singleIconMode />
      </div>
      <Col span={20} className={classes.rightSection}>
        <Form
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="full_name"
                rules={[{ required: true, message: "ism kiritish majburiy" }]}
              >
                <FormElements.Input
                  prefix={<UserIcon />}
                  placeholder="Ism, familya va otasining ismini kiriting"
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="phone_number"
                rules={[{ required: true, message: "telefon raqam majburiy" }]}
              >
                <FormElements.PhoneInput style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="source"
                rules={[{ required: true, message: "manbani kiritish majburiy" }]}
              >
                <FormElements.Select
                  showSearch
                  placeholder="Manbani tanlang"
                
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="direction"
                rules={[{ required: true, message: `yo'nalish majburiy` }]}
              >
                <FormElements.Select
                  showSearch
                  placeholder="Yo'nalishni tanlang"
              
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="status"
                rules={[{ required: true, message: "status majburiy" }]}
              >
                <FormElements.Select
                  showSearch
                  placeholder="Statusni tanlang"
               
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  fullWidth
                >
                  Jo'natish
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </section>
  );
};

export default LeadForm;
