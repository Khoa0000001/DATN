import React, { useEffect, useState } from "react";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile, RcFile } from "antd/es/upload/interface";

type ImageValue = File | { id?: string; imageUrl: string };

interface Props {
  value?: ImageValue[];
  onChange?: (value: ImageValue[]) => void;
  maxCount?: number;
}

const UploadMultipleImages: React.FC<Props> = ({
  value = [],
  onChange,
  maxCount = 8,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    const hasOnlyBlob = fileList.every(
      (file) => file.originFileObj instanceof File
    );
    if (value.length !== fileList.length || hasOnlyBlob) {
      const newFileList: UploadFile[] = value.map((item, index) => {
        if (item instanceof File) {
          return {
            uid: `file-${index}-${item.name}`,
            name: item.name,
            status: "done",
            url: URL.createObjectURL(item),
            originFileObj: item as RcFile,
          };
        } else {
          return {
            uid: item.id || `remote-${index}`,
            name: `image-${index}`,
            status: "done",
            url: item.imageUrl,
          };
        }
      });

      setFileList(newFileList);
    }

    return () => {
      fileList.forEach((file) => {
        if (
          file.originFileObj instanceof File &&
          file.url?.startsWith("blob:")
        ) {
          URL.revokeObjectURL(file.url);
        }
      });
    };
  }, [value]);

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);

    const newValue: ImageValue[] = fileList.map((file) => {
      if (file.originFileObj instanceof File) {
        return file.originFileObj;
      } else {
        return {
          id: file.uid.startsWith("remote") ? undefined : file.uid,
          imageUrl: file.url!,
        };
      }
    });

    onChange?.(newValue);
  };

  return (
    <Upload
      listType="picture-card"
      fileList={fileList}
      onChange={handleChange}
      beforeUpload={() => false}
      multiple
    >
      {fileList.length >= maxCount ? null : (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Tải ảnh</div>
        </div>
      )}
    </Upload>
  );
};

export default UploadMultipleImages;
