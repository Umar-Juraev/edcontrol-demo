import { FC, useEffect, useState } from "react";
import { Form } from "antd";
import toast from "react-hot-toast";

import { FormElements, Button, Modal } from "components/shared";
import { BuildingIcon, LocationIcon } from "components/svg";
import { useCreatePhotoMutation, useDistrictsQuery, useRegionsQuery, useUpdateBranchMutation } from "store/endpoints";
import { BranchesDTO } from "types";
import { parsePhoneNumber } from "utils";

export type Props = {
  visible: boolean;
  setVisible: (bool: boolean) => void;
  data?: BranchesDTO;
};

const UpdateBranchModal: FC<Props> = ({ visible, setVisible, data }) => {
  const [form] = Form.useForm();
  const [regionId, setRegionId] = useState<number>()
  const [file, setFile] = useState<any>(null);

  const regionsQuery = useRegionsQuery()
  const districtsQuery = useDistrictsQuery({ region: regionId })

  const [updateMutation, { isLoading }] = useUpdateBranchMutation()
  const [uploadPhotoMutation] = useCreatePhotoMutation();

  useEffect(() => {
    form.setFieldsValue({
      name: data?.name,
      district: data?.district.name,
      phone_number: data?.phone_number,
      address: data?.address
    })
  }, [data, form]);

  const onFinish = (values: any) => {
    const updateValues = {
      ...values,
      name: values.name,
      phone_number: parsePhoneNumber(values.phone_number),
      district: !!Number(values.district) ? values.district : data?.district.id,
      address: values.address
    }
    delete updateValues.region

    if (file) {
      const formData = new FormData();
      formData.append('file', file.originFileObj)
      const photoMutationPromise = uploadPhotoMutation(formData).unwrap()

      toast
        .promise(photoMutationPromise, {
          loading: `rasm yuklanmoqda...`,
          success: `muvaffaqqiyatli yuklandi`,
          error: ({ data }) => JSON.stringify(data),
        })
        .then((res: any) => {
          const mutationPromise = updateMutation({ ...updateValues, id: data?.id, photo: res.id }).unwrap();

          toast
            .promise(mutationPromise, {
              loading: `filial ma'lumotlari yangilanmoqda...`,
              success: `muvaffaqqiyatli yangilandi`,
              error: ({ data }) => JSON.stringify(data),
            })
            .then(() => {
              setVisible(false);
            });
        })
    } else {
      const mutationPromise = updateMutation({ id: data?.id, ...updateValues }).unwrap()
      toast
        .promise(mutationPromise, {
          loading: `filial ma'lumotlari yangilanmoqda...`,
          success: `muvaffaqqiyatli yangilandi`,
          error: (({ data }) => JSON.stringify(data))
        })
        .then(() => {
          setVisible(false);
        });
    }
  }

  function onChangeUpload(e?: any): void {
    if (e.file.status === "done") {
      setFile(e.file);
    } else if (e.file.status === "removed") {
      setFile(null);
    }
  }

  return (
    <Modal
      title="Yangi filial"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <Form.Item label="Rasm yuklash">
          <FormElements.Upload dragger onChange={onChangeUpload} />
        </Form.Item>

        <Form.Item
          name="name"
          label="Filial nomi:"
          rules={[{ required: true, message: "Filial nomi majburiy" }]}
        >
          <FormElements.Input suffix={<BuildingIcon />} />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Telefon raqam:"
          rules={[{ required: true, message: "Telefon raqam majburiy" }]}
        >
          <FormElements.PhoneInput />
        </Form.Item>

        <Form.Item name="region" label="Viloyat" >
          <FormElements.Select
            placeholder="Toshkent shahri"
            loading={regionsQuery.isFetching}
            onSelect={(e: number) => setRegionId(e)}
            options={regionsQuery.data?.map((item) => ({
              title: item.name,
              value: item.id,
              key: item.id,
            }))}
          />
        </Form.Item>

        <Form.Item name="district" label="Tuman" rules={[{ required: true, message: "Tuman majburiy" }]}>
          <FormElements.Select
            loading={districtsQuery.isFetching}
            options={districtsQuery.data?.map((item) => ({
              title: item.name,
              value: item.id,
              key: item.id,
            }))}
          />
        </Form.Item>

        <Form.Item name="address" label="Manzil">
          <FormElements.Input suffix={<LocationIcon />} />
        </Form.Item>

        <Button
          fullWidth
          type="primary"
          htmlType="submit"
          size="large"
          loading={isLoading}
          disabled={isLoading}
        >
          Yangi filial qo'shish
        </Button>
      </Form>
    </Modal>
  );
};

export default UpdateBranchModal;
