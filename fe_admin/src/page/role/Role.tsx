/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Table, Button, Space, Popconfirm, Input, Row, Col } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  SaveOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsers } from "@/store/slice/userSlice";

const Role: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1); // 👈 Thêm state trang hiện tại
  const [searchText, setSearchText] = useState("");
  interface DataType {
    id: string;
    nameUser: string;
    email: string;
  }
  const dispatch = useAppDispatch();
  const { users, meta } = useAppSelector((status) => status.users);

  const handleView = (record: any) => {
    console.log(`Xem chi tiết: ${record.id}`);
  };

  const handleEdit = (record: any) => {
    console.log(`Chuyển đến chỉnh sửa: ${record.id}`);
  };

  const handleDelete = (record: any) => {
    console.log(`Đã xóa: ${record.id}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

  const handleBulkSave = () => {
    const selectedItems = users.filter((item: any) =>
      selectedRowKeys.includes(item.id)
    );
    console.log(`Đã lưu ${selectedItems.length} mục ✅`);
  };

  const handleBulkDelete = () => {
    console.log("Đã xóa các mục đã chọn", selectedRowKeys);
    setSelectedRowKeys([]);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên",
      dataIndex: "nameUser",
      key: "nameUser",
      sorter: (a, b) => a.nameUser.localeCompare(b.nameUser),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Hành động",
      key: "action",
      fixed: "right",
      width: 180,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            type="link"
            onClick={() => handleView(record)}
          />
          <Button
            icon={<EditOutlined />}
            type="link"
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDelete(record)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger type="link" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, limit: pageSize })).unwrap();
  }, [currentPage, pageSize]);

  return (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Space>
            <Input
              placeholder="Tìm kiếm theo tên..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={handleSearch}
              allowClear
            />
          </Space>
        </Col>

        <Col>
          <Space>
            {selectedRowKeys.length > 0 && (
              <>
                <Button
                  icon={<SaveOutlined />}
                  type="primary"
                  onClick={handleBulkSave}
                >
                  Lưu tất cả ({selectedRowKeys.length})
                </Button>
                <Popconfirm
                  title="Bạn có chắc muốn xóa tất cả các mục đã chọn?"
                  onConfirm={handleBulkDelete}
                  okText="Xóa tất cả"
                  cancelText="Hủy"
                >
                  <Button danger icon={<DeleteOutlined />}>
                    Xóa tất cả
                  </Button>
                </Popconfirm>
              </>
            )}
            <Button
              type="primary"
              onClick={() => console.log("Mở form thêm mới")}
              icon={<PlusOutlined />}
            >
              Thêm mới
            </Button>
          </Space>
        </Col>
      </Row>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={users}
        rowKey="id"
        scroll={{ x: "max-content", y: 500 }}
        pagination={{
          current: currentPage, // 👈 binding current page
          total: meta?.total || 0,
          pageSize: pageSize,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          onChange: (page, size) => {
            setCurrentPage(page); // 👈 Cập nhật trang
            setPageSize(size); // 👈 Cập nhật pageSize nếu người dùng thay đổi
          },
          showTotal: (total, range) =>
            `Hiển thị ${range[0]}-${range[1]} trên tổng ${total} mục`,
        }}
      />
    </>
  );
};

export default Role;
