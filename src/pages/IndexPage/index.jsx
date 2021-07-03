import React, { useState, useRef } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Card,
  Row,
  Col,
  Avatar,
  Image
} from "antd";
import "antd/dist/antd.css";
import { ids } from "../../constants/exchange";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import "./index.css";

// function isValidURL(url){
//   var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

//   if(RegExp.test(url)){
//       return url;
//   }else{
//       return '#';
//   }
// }

export const IndexPage = ({ currentTickers, exchanges, current }) => {
  const [columnFilter, setColumnFilter] = useState({
    searchText: "",
    searchedColumn: ""
  });
  const [selection, setSelection] = useState([]);

  // const [newCurrent, setNewCurrent] = useState([]);

  // useEffect(() => {
  //   if (newCurrent.length < ids.length) {
  //     setNewCurrent(current)
  //   }else if (newCurrent.length === ids.length &&
  //             current.length === ids.length){
  //     let newChanges = newCurrent.map(currentAfter => ({
  //       name: currentAfter.name,
  //       usd: current.find(newCurrent => newCurrent.name === currentAfter.name)

  //     }))
  //     setNewCurrent(newChanges)
  //     console.log('newCurrent', newCurrent)
  //   }
  // },[current])

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
          <Avatar
            draggable={false}
            src={<Image src={exchanges.find((e) => e.name === name)?.image} />}
          />
          <span style={{ marginLeft: "14px" }}>{name}</span>
        </div>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"]
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
      key: "target",
      ...getColumnSearchProps("base"),
      sorter: (a, b) => a.base.length - b.base.length,
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      ...getColumnSearchProps("base"),
      sorter: (a, b) => a.base.length - b.base.length,
      sortDirections: ["descend", "ascend"]
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

  const onSelectChange = (select) => {
    console.log("select", select)
    if(select.length === 0) {
      setSelection([])
    }
    if (select.length === 2) {
      select.map((item) => {
        currentTickers.find(
          (element) =>
            element.id === item &&
            setSelection((before) => [...before, element])
        );
      });
    }
  };

  const selectedRow = {
    onChange: onSelectChange
  };

  return (
    <div className="content">
      {console.log("selection", selection)}
      <div style={{ margin: "16px" }}>
        <Row gutter={[16, 16]} style={{ textAlign: "center" }}>
          {current.length === ids.length &&
            current
              .sort(function (a, b) {
                if (a.name > b.name) {
                  return 1;
                }
                if (a.name < b.name) {
                  return -1;
                }
                return 0;
              })
              .map((cash, index) => (
                <Col span={(3, 4)} key={index}>
                  <Card
                    title={
                      <div>
                        <Avatar
                          draggable={false}
                          src={
                            <Image src={`./assets/coins/${cash.name}.png`} />
                          }
                        />
                        <span style={{ marginLeft: "12px" }}>
                          {cash.name.toUpperCase()}
                        </span>
                      </div>
                    }
                    style={{ fontSize: "24px" }}
                  >
                    {cash.usd}
                  </Card>
                </Col>
              ))}
        </Row>
      </div>
      <Row gutter={[16, 16]} style={{marginBottom: '14px'}}>
        <Col span={6}>
          <Card title="Inversión a realizar" style={{fontSize: '18px'}}> 100 </Card>
        </Col>
        <Col span={6}>
          {" "}
          <Card title={selection[0] ? `${selection[0].name} en ${selection[0].base}` : 'Exchange en cripto'} style={{fontSize: '18px'}}>
            {" "}
            {selection[0] ? selection[0].last : 'Precio cripto'}
          </Card>{" "}
        </Col>
        <Col span={6}>
          {" "}
          <Card title={selection[1] ? `${selection[1].name} en ${selection[1].base}` : 'Exchange en cripto'} style={{fontSize: '18px'}}>
            {" "}
            {selection[1] ? selection[1].last : 'Precio cripto'}
          </Card>{" "}
        </Col>
        <Col span={6}>
          {" "}
          <Card title='Beneficio' style={{fontSize: '18px'}}>
            {" "}
            {selection[0] && selection[1] ? (100/selection[0].last - 100/selection[1].last) : 'Precio cripto'}
          </Card>{" "}
        </Col>
      </Row>
      <Table
        className="table-striped-rows"
        columns={columns}
        dataSource={currentTickers}
        pagination={{ pageSize: 50, showSizeChanger: false }}
        rowKey="id"
        rowSelection={selectedRow}
      />
    </div>
  );
};
