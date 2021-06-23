import React from "react";
import { Table } from "antd";

export const TableRender = () => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey}
      rowClassName={rowClassName}
      rowSelection={rowSelection}
      // loading={loading}
      // pagintaion={
      //   pagination
      //     ? (pagination = "nothing" ? false : pagination)
      //     : { pageSize: 100, showSizeChanger: false }
      // }
      // onRow={onRow}
      // onChange={onChange}
      // title={title}
      // showHeader={!hiddenHeader}
      // className={className}
      // scroll={scroll}
      // components={components}
      // locale={locale}
    />
  );
};
