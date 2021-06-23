import React, { useState, useRef } from "react";
// import { TableRender } from "components/TableRender";
import { Table, Input, Button, Space, Card, Row, Col } from "antd";
import "antd/dist/antd.css";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import './index.css'

export const IndexPage = ({ currentTickers, exchanges, current }) => {
  const [columnFilter, setColumnFilter] = useState({
    searchText: "",
    searchedColumn: ""
  });

  const searchInput = useRef(null);
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Buscar en ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Limpiar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setColumnFilter({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex
              });
            }}
          >
            Filtrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput, 100);
      }
    },
    render: (text) =>
      columnFilter.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[columnFilter.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      )
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setColumnFilter({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setColumnFilter({ searchText: "" });
  };
  const columns = [
    {
      title: "Exhanges",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <div>
          {/* <img
            src={exchanges.find((e) => e.name === name).image}
            alt={name}
          /> */}
          {name}
        </div>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
      // ...getColumnSearchProps("name")
    },
    {
      title: "WEB",
      dataIndex: "url",
      key: "url",
      render: (url) => <a href={url}>Sitio web</a>
    },
    {
      title: "Base",
      dataIndex: "base",
      key: "base",
      ...getColumnSearchProps("base"),
      sorter: (a, b) => a.base.length - b.base.length,
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Cripto",
      dataIndex: "target",
      key: "target"
    },
    {
      title: "Volumen cripto ex",
      dataIndex: "volume",
      key: "volume",
      ...getColumnSearchProps("volume"),
      sorter: (a, b) => a.volume - b.volume,
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Precio de mercado",
      dataIndex: "usd",
      key: "usd",
      ...getColumnSearchProps("usd"),
      sorter: (a, b) => a.usd - b.usd,
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Precio exchange",
      dataIndex: "last",
      key: "last",
      ...getColumnSearchProps("last"),
      sorter: (a, b) => a.last - b.last,
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Precio con comisión",
      dataIndex: "spread",
      key: "spread",
      ...getColumnSearchProps("spread"),
      sorter: (a, b) => a.spread - b.spread,
      sortDirections: ["descend", "ascend"]
    }
  ];

  return (
    <div className="content">
      <div style={{margin: '16px'}}>
      <Row gutter={[16, 16]} style={{textAlign: 'center'}}>
        {current.map((cash, index) => 
          (<Col span={3,4} key={index}>
            <Card title={cash.name.toUpperCase()} style={{fontSize: '24px'}} >{cash.usd}</Card>
          </Col>)
        )}
      </Row>
      </div>
      <Table
        className="table-striped-rows"
        columns={columns}
        dataSource={currentTickers}
        pagination={{ pageSize: 50, showSizeChanger: false }}
      />
    </div>
  );
};
