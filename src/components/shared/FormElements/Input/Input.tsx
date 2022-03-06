import React, { FC } from 'react';
import { Input as AntdInput, InputProps } from 'antd'
import cn from 'classnames'

import './Input.scss';

export type Props = InputProps & {
    isSearch?: boolean;
    isPassword?: boolean;
}

const Input: FC<Props> = ({ isSearch, prefix, isPassword, ...props }) => {
    const { Search, Password } = AntdInput

    const classNames = cn(
        !prefix && `simple-input`
    )

    if (isSearch) {
        return <Search {...props} prefix={prefix} className={classNames} />
    } else if (isPassword) {
        return <Password  {...props} prefix={prefix} className={classNames} />
    } else {
        return <AntdInput  {...props} prefix={prefix} className={classNames} />
    }
}

export default Input;