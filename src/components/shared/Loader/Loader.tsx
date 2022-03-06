import React, { FC } from 'react'
import { Spin, SpinProps } from 'antd'
import { LoadingOutlined } from "@ant-design/icons";
import cn from 'classnames';

import classes from './Loader.module.scss'
import './spin.css'

type Props = SpinProps & {
    className?: string;
    loaderSize?: 40 | 56 | 70
}

const Loader: FC<Props> = ({ className, loaderSize = 56, children, ...props }) => {

    const classNames = cn(
        className && className,
        classes.loaderWrapper,
    )

    return (
        <div className={classNames}>
            <Spin
                indicator={
                    <LoadingOutlined style={{ fontSize: loaderSize }} />
                }
                {...props}
            >
                {children}
            </Spin>
        </div>
    )
}

export default Loader
