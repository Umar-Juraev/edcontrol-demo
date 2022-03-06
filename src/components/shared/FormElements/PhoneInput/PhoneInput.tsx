import React, { ChangeEvent, FC } from 'react'
import { MaskedInput } from "antd-mask-input";

import { NumberIcon } from "components/svg";

import classes from './Input.module.scss';

export type Props = {
    size?: `small` | `middle` | `large`;
    style?: any;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => any;
    defaultValue?: string | number | readonly string[]
}

const Input: FC<Props> = ({ size, style, defaultValue, onChange, ...props }) => {
    return (
        <>
            <MaskedInput
                mask="+998 ## ###-##-##"
                placeholder="+998 _ _  _ _ _ - _ _ - _ _"
                size={size}
                style={style}
                prefix={<NumberIcon />}
                onChange={onChange}
                defaultValue={defaultValue}
                {...props}
            />
        </>
    )
}

export default Input;