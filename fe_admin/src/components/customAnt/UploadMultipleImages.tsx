import React, { useEffect, useState } from "react";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile, RcFile } from "antd/es/upload/interface";

interface Props {
  value?: File[];
  onChange?: (value: File[]) => void;
}

const UploadMultipleImages: React.FC<Props> = ({ value = [], onChange }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    // Tạo danh sách UploadFile từ File[]
    const newFileList: UploadFile[] = value.map((file, idx) => {
      const objectUrl = URL.createObjectURL(file);
      return {
        uid: `${idx}`,
        name: file.name,
        status: "done",
        url: objectUrl,
        originFileObj: file as RcFile,
      };
    });

    setFileList(newFileList);

    // Cleanup các object URL khi component unmount hoặc value thay đổi
    return () => {
      newFileList.forEach((file) => {
        if (file.url) {
          URL.revokeObjectURL(file.url);
        }
      });
    };
  }, [value]);

  const handleChange = (info: { fileList: UploadFile[] }) => {
    setFileList(info.fileList);

    const files: File[] = info.fileList
      .filter((file) => file.originFileObj instanceof File)
      .map((file) => file.originFileObj as File);

    if (onChange) {
      onChange(files);
    }
  };

  return (
    <Upload
      listType="picture-card"
      multiple
      fileList={fileList}
      onChange={handleChange}
      beforeUpload={() => false} // Ngăn không cho AntD tự upload
    >
      {fileList.length >= 8 ? null : (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Tải ảnh</div>
        </div>
      )}
    </Upload>
  );
};

export default UploadMultipleImages;
