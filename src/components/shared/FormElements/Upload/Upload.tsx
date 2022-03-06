import React, { FC } from 'react';
import { message, Upload as AntdUpload, UploadProps } from 'antd';
import { UploadIcon } from 'components/svg';

import classes from './Upload.module.scss';

export type Props = UploadProps & {
    dragger?: boolean;
};

const Upload: FC<Props> = ({ dragger, ...props }) => {

    function beforeUpload(file: any) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Faqat JPG/PNG fayl yuklash kerak!');
        }
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
            message.error(`Rasm hajmi 5MB dan kichik bo'lishi kerak`);
        }
        return isJpgOrPng && isLt2M;
    }

    const customRequest = (file: any) => {
        setTimeout(() => {
            file.onSuccess("ok");
        }, 0);
    };

    return (
        dragger ? (
            <AntdUpload.Dragger
                beforeUpload={beforeUpload}
                customRequest={customRequest}
                listType="picture"
                maxCount={1}
                {...props}
            >
                <p className="ant-upload-drag-icon">
                    <UploadIcon />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </AntdUpload.Dragger>
        ) : (
            <AntdUpload
                {...props}
            />
        )
    )
}

export default Upload;