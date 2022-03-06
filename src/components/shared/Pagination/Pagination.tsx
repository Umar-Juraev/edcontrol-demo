import React, { FC } from "react";
import { Pagination as AntdPagination, PaginationProps } from "antd";
// import "./Pagination.scss";

type Props = PaginationProps & {

}

const Pagination: FC<Props> = ({ ...props }) => {
	return (
		<AntdPagination
			className={"ant-pagination"}
			showSizeChanger={false}
			{...props}
		/>
	);
};

export default Pagination;
