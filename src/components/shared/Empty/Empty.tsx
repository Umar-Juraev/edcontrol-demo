import React, { FC } from 'react'
import { Empty as EmptyAntd, EmptyProps } from 'antd'

type Props = EmptyProps & {

}

const AntdEmpty: FC<Props> = ({ description = "Ma'lumot yo'q", ...props }) => {
    return (
        <div
            style={{
                minHeight: '50vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <EmptyAntd
                description={description}
                {...props}
            />
        </div>
    )
}

export default AntdEmpty
