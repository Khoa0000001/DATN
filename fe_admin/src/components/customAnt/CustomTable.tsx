/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Table, Button, Space, Popconfirm, Input, Row, Col } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useDebounce } from "@/hook/useDebounce"; // Giả sử bạn đã tạo hook useDebounce như trước

interface CustomTableProps {
  columns: ColumnsType<any>;
  dataSource: any[];
  total: number;
  dataFetch: (
    currentPage: number,
    pageSize: number,
    searchText: string
  ) => void;
  onAdd?: () => void;
  onDelete?: (records: any[]) => void;
  onView?: (record: any) => void;
  onEdit?: (record: any) => void;
  initialPageSize?: number;
  initialCurrentPage?: number;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  dataSource,
  total,
  dataFetch,
  onAdd,
  onDelete,
  onView,
  onEdit,
  initialPageSize = 10,
  initialCurrentPage = 1,
}) => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [searchText, setSearchText] = useState("");

  // Sử dụng hook useDebounce để debounce searchText
  const debouncedSearchText = useDebounce(searchText, 500);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setSelectedRows(selectedRows);
    },
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value.replace(/^\s+/, ""));
  };

  const actionColumn = {
    title: "Hành động",
    key: "action",
    fixed: "right" as const,
    width: 180,
    align: "center" as const,
    render: (_: any, record: any) => (
      <Space>
        {onView && (
          <Button
            icon={<EyeOutlined />}
            type="link"
            onClick={() => onView(record)}
          />
        )}
        {onEdit && (
          <Button
            icon={<EditOutlined />}
            type="link"
            onClick={() => onEdit(record)}
          />
        )}
        {onDelete && (
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => onDelete([record])}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger type="link" icon={<DeleteOutlined />} />
          </Popconfirm>
        )}
      </Space>
    ),
  };

  const newColumns =
    onDelete || onView || onEdit ? [...columns, actionColumn] : columns;

  // Sử dụng useEffect để gọi dataFetch khi debouncedSearchText thay đổi
  useEffect(() => {
    dataFetch(currentPage, pageSize, debouncedSearchText);
  }, [currentPage, pageSize, debouncedSearchText]);

  return (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Space style={{ width: "100%" }}>
            <Input
              placeholder="Tìm kiếm theo tên..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={handleSearch}
              allowClear
              style={{ width: 280 }}
            />
          </Space>
        </Col>

        <Col>
          <Space>
            {selectedRows.length > 0 && onDelete && (
              <Popconfirm
                title="Bạn có chắc muốn xóa tất cả các mục đã chọn?"
                onConfirm={() => onDelete(selectedRows)}
                okText="Xóa tất cả"
                cancelText="Hủy"
              >
                <Button danger icon={<DeleteOutlined />}>
                  Xóa tất cả ({selectedRows.length})
                </Button>
              </Popconfirm>
            )}
            {onAdd && (
              <Button type="primary" onClick={onAdd} icon={<PlusOutlined />}>
                Thêm mới
              </Button>
            )}
          </Space>
        </Col>
      </Row>

      <Table
        rowSelection={rowSelection}
        columns={newColumns}
        dataSource={dataSource}
        rowKey="id"
        scroll={{ x: "max-content", y: 500 }}
        pagination={{
          current: currentPage,
          total: total || 0,
          pageSize: pageSize,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
          showTotal: (total, range) =>
            `Hiển thị ${range[0]}-${range[1]} trên tổng ${total} mục`,
        }}
      />
    </>
  );
};

export default CustomTable;
