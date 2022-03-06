import React, { FC, useEffect, useState } from "react";
import { Form } from "antd";
import moment from "moment";
import toast from "react-hot-toast";

import { GENDER_TYPE } from "constants/states";
import { checkObjectValueExist, parsePhoneNumber } from "utils";
import { Button, FormElements, Modal } from "components/shared";
import {
  useDistrictsQuery,
  useRegionsQuery,
  useCreateExtraPhoneNumberMutation,
  useCreateStudentMutation,
  useCreatePupilMutation,
  useGroupsFullQuery,
  useCreatePhotoMutation,
  useUpdateClientMutation,
  useStatusesQuery
} from "store/endpoints";
import { ClientsDTO } from "types";
import { useAppSelector } from "store/hooks";

export type Props = {
  selectedClient?: ClientsDTO;
  visible: boolean;
  setVisible: (bool: boolean) => void;
};

const ClientStudentCreateModal: FC<Props> = ({ selectedClient, visible, setVisible }) => {
  const [form] = Form.useForm()
  const [regionId, setRegionId] = useState<number>()
  const [file, setFile] = useState<any>(null);
  const { currentUser } = useAppSelector(state => state.persistedData)

  const groupsQuery = useGroupsFullQuery()
  const regionsQuery = useRegionsQuery()
  const districtsQuery = useDistrictsQuery({ region: regionId })
  const statusesQuery = useStatusesQuery();

  const [studentCreateMutation, { isLoading: studentMutationLoading }] = useCreateStudentMutation()
  const [pupilCreateMutation, { isLoading: pupilMutationLoading }] = useCreatePupilMutation()
  const [extraPhoneCreateMutation, { isLoading: extraPhoneMutationLoading }] = useCreateExtraPhoneNumberMutation()
  const [uploadPhotoMutation] = useCreatePhotoMutation();
  const [updateClientMutation] = useUpdateClientMutation();

  useEffect(() => {
    form.setFieldsValue({
      full_name: selectedClient?.full_name,
      phone_number: selectedClient?.phone_number
    })
  }, [form, selectedClient])

  const onFinish = (values: any) => {
    const studentValues = {
      full_name: values.full_name,
      phone_number: parsePhoneNumber(values.phone_number),
      birth_date: moment(values.birth_date).format('YYYY-MM-DD'),
      branch: currentUser.data?.branch?.id,
      gender: values.gender,
      district: values.district,
      address: values.address,
    }
    checkObjectValueExist(studentValues)

    if (file) {
      const formData = new FormData();
      formData.append('file', file.originFileObj)
      const photoMutationPromise = uploadPhotoMutation(formData).unwrap()

      // upload photo mutation
      toast
        .promise(photoMutationPromise, {
          loading: `rasm yuklanmoqda...`,
          success: `muvaffaqqiyatli yuklandi`,
          error: ({ data }) => JSON.stringify(data),
        })

        // create student mutation
        .then((res: any) => {
          const mutationPromise = studentCreateMutation({ ...studentValues, photo: res.id }).unwrap()
          toast
            .promise(mutationPromise, {
              loading: `talaba qo'shilmoqda...`,
              success: `talaba muvaffaqqiyatli qo'shildi`,
              error: (({ data }) => JSON.stringify(data))
            })

            // create extra number mutation
            .then((userInfo) => {
              const updateClientPromise = updateClientMutation({
                id: selectedClient?.id,
                status: statusesQuery.data?.slice(-1)[0].id
              }).unwrap();

              toast.promise(updateClientPromise, {
                loading: `mijoz studentga aylantirilmoqda...`,
                success: `muvaffaqiyatli studentga aylantirildi`,
                error: ({ data }) => JSON.stringify(data),
              });

              setVisible(false)
              form.resetFields()

              // create pupil mutation from user response
              if (values.group) {
                const pupilValues = {
                  user: userInfo.id,
                  group: values.group
                }
                const pupilMutationPromise = pupilCreateMutation(pupilValues).unwrap()

                toast
                  .promise(pupilMutationPromise, {
                    loading: `o'quvchi sifatida guruhga qo'shilmoqda...`,
                    success: `guruhga muvaffaqqiyatli qo'shildi`,
                    error: (({ data }) => JSON.stringify(data))
                  })
              }

              // if extra phone number exists, create extra number mutation
              if (values.extra_phone_numbers) {
                const numbers = values.extra_phone_numbers?.map((item: any) => parsePhoneNumber(item.value))

                numbers.forEach((item: any) => {
                  const extraPhoneValues = {
                    user: userInfo.id,
                    phone_number: item
                  }
                  const extraPhoneMutationPromise = extraPhoneCreateMutation(extraPhoneValues).unwrap()

                  toast
                    .promise(extraPhoneMutationPromise, {
                      loading: `qo'shimcha raqam qo'shilmoqda...`,
                      success: `qo'shimcha raqam muvaffaqqiyatli qo'shildi`,
                      error: (({ data }) => JSON.stringify(data))
                    })
                })
              }

              // if parents phone number exists, create parents phone number mutation
              if (values.parent_extra_phone_numbers) {
                const numbers = values.parent_extra_phone_numbers?.map((item: any) => parsePhoneNumber(item.value))

                numbers.forEach((item: any) => {
                  const extraPhoneValues = {
                    user: userInfo.id,
                    phone_number: item,
                    is_parents: true
                  }
                  const extraPhoneMutationPromise = extraPhoneCreateMutation(extraPhoneValues).unwrap()

                  toast
                    .promise(extraPhoneMutationPromise, {
                      loading: `ota-ona raqami qo'shilmoqda...`,
                      success: `ota-ona raqami muvaffaqqiyatli qo'shildi`,
                      error: (({ data }) => JSON.stringify(data))
                    })
                })
              }

            })
        })

      //if photo doesn't exist create only student mutation and extra number
    } else {
      const mutationPromise = studentCreateMutation(studentValues).unwrap()
      toast
        .promise(mutationPromise, {
          loading: `talaba qo'shilmoqda...`,
          success: `talaba muvaffaqqiyatli qo'shildi`,
          error: (({ data }) => JSON.stringify(data))
        })

        // create extra number mutation
        .then((userInfo) => {
          const updateClientPromise = updateClientMutation({
            id: selectedClient?.id,
            status: statusesQuery.data?.slice(-1)[0].id
          }).unwrap();

          toast.promise(updateClientPromise, {
            loading: `mijoz studentga aylantirilmoqda...`,
            success: `muvaffaqiyatli studentga aylantirildi`,
            error: ({ data }) => JSON.stringify(data),
          });

          setVisible(false)
          form.resetFields()

          // create pupil mutation from user response
          if (values.group) {
            const pupilValues = {
              user: userInfo.id,
              group: values.group
            }
            const pupilMutationPromise = pupilCreateMutation(pupilValues).unwrap()

            toast
              .promise(pupilMutationPromise, {
                loading: `o'quvchi guruhga qo'shilmoqda...`,
                success: `o'quvchi guruhga muvaffaqqiyatli qo'shildi`,
                error: (({ data }) => JSON.stringify(data))
              })
          }

          // if extra phone number exists, create extra number mutation
          if (values.extra_phone_numbers) {
            const numbers = values.extra_phone_numbers?.map((item: any) => parsePhoneNumber(item.value))

            numbers.forEach((item: any) => {
              const extraPhoneValues = {
                user: userInfo.id,
                phone_number: item
              }
              const extraPhoneMutationPromise = extraPhoneCreateMutation(extraPhoneValues).unwrap()

              toast
                .promise(extraPhoneMutationPromise, {
                  loading: `qo'shimcha raqam qo'shilmoqda...`,
                  success: `qo'shimcha raqam muvaffaqqiyatli qo'shildi`,
                  error: (({ data }) => JSON.stringify(data))
                })
            })
          }

          // if parents phone number exists, create parents phone number mutation
          if (values.parent_extra_phone_numbers) {
            const numbers = values.parent_extra_phone_numbers?.map((item: any) => parsePhoneNumber(item.value))

            numbers.forEach((item: any) => {
              const extraPhoneValues = {
                user: userInfo.id,
                phone_number: item,
                is_parents: true
              }
              const extraPhoneMutationPromise = extraPhoneCreateMutation(extraPhoneValues).unwrap()

              toast
                .promise(extraPhoneMutationPromise, {
                  loading: `ota-ona raqami qo'shilmoqda...`,
                  success: `ota-ona raqami muvaffaqqiyatli qo'shildi`,
                  error: (({ data }) => JSON.stringify(data))
                })
            })
          }

        })
    }
  };

  function onChangeUpload(e?: any) {
    if (e.file.status === 'done') {
      setFile(e.file)
    } else if (e.file.status === 'removed') {
      setFile(null)
    }
  };

  return (
    <Modal
      title="Yangi talaba qo'shish"
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <Form
        name="basic"
        onFinish={onFinish}
        form={form}
        layout="vertical"
      >

        <Form.Item label="Rasm yuklash">
          <FormElements.Upload dragger onChange={onChangeUpload} />
        </Form.Item>

        <Form.Item name="full_name" label="To'liq ismi" rules={[{ required: true, message: "ism majburiy" }]}>
          <FormElements.Input />
        </Form.Item>

        <Form.Item name="phone_number" label="Telefon raqam" rules={[{ required: true, message: "telefon raqam majburiy" }]}>
          <FormElements.PhoneInput />
        </Form.Item>

        <FormElements.InputGenerator
          name="extra_phone_numbers"
          label="Qo'shimcha telefon raqam"
          keyName="value"
          buttonName="Qo'shimcha raqam kiritish"
        >
          <FormElements.PhoneInput />
        </FormElements.InputGenerator>

        <Form.Item name="birth_date" label="Tug'ilgan sana" rules={[{ required: true, message: "tug'ilgan sana majburiy" }]}>
          <FormElements.DatePicker format="DD MMMM YYYY" />
        </Form.Item>

        <Form.Item name="gender" label="Jinsi">
          <FormElements.Select
            showSearch
            options={GENDER_TYPE.map((item: any) => ({
              title: item.title,
              value: item.value,
              key: item.value,
            }))}
          />
        </Form.Item>

        <Form.Item name="group" label="Guruhi" >
          <FormElements.Select
            showSearch
            loading={groupsQuery.isFetching}
            options={groupsQuery.data?.map((item) => ({
              title: item.name,
              value: item.id,
              key: item.id,
            }))}
          />
        </Form.Item>

        <FormElements.InputGenerator
          name="parent_extra_phone_numbers"
          label="Ota-ona telefon raqami"
          keyName="value"
          buttonName="Ota-ona telefonini qo'shish"
        >
          <FormElements.PhoneInput />
        </FormElements.InputGenerator>

        <Form.Item name="region" label="Viloyat" >
          <FormElements.Select
            placeholder="Toshkent shahri"
            loading={regionsQuery.isFetching}
            onSelect={(e: any) => setRegionId(e)}
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
          <FormElements.Input />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          fullWidth
          size="large"
          disabled={studentMutationLoading || pupilMutationLoading || extraPhoneMutationLoading}
          loading={studentMutationLoading || pupilMutationLoading || extraPhoneMutationLoading}
        >
          Tasdiqlash
        </Button>
      </Form>
    </Modal >
  );
};

export default ClientStudentCreateModal;
