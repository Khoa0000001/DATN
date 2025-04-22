import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, Input, Avatar, Col, Row, Card, Tag } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fetchRoles } from "@/store/slice/roleSlice";
import CustomSelect from "@/components/customAnt/CustomSelect";

interface Role {
  id: string;
  nameRole: string;
  codeRole: string;
}

interface DataType {
  id: string;
  nameUser: string;
  email: string;
  phone: string;
  address: string;
  profilePicture: string;
  userRoles: { role: Role }[];
  isDeleted: boolean;
  isVerified: boolean;
  createDate: Date;
  updateDate: Date;
}

interface FormData {
  userId: string;
  roleIds: string[];
}

const schema = yup.object({
  userId: yup.string().required("User ID là bắt buộc"),
  roleIds: yup
    .array()
    .of(yup.string().required()) // 👈 Thêm .required() ở đây
    .min(1, "Phải chọn ít nhất một quyền")
    .required("Vai trò là bắt buộc"),
});

interface Props {
  onSubmit: (data: FormData) => void;
  loading?: boolean;
  data: DataType;
}

const EditPermission: React.FC<Props> = ({ onSubmit, loading, data }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      userId: data.id,
      roleIds: data.userRoles.map((ur) => ur.role.id),
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        userId: data.id,
        roleIds: data.userRoles.map((ur) => ur.role.id),
      });
    }
  }, [data, reset]);

  return (
    <Card variant="borderless" className=" mx-auto p-6">
      <Row gutter={16}>
        {/* User Profile Section */}
        <Col span={8} className="text-center mb-5">
          <Avatar
            size={140}
            src={data.profilePicture || "/default-avatar.png"} // Default image if no profile picture
            alt={data.nameUser}
          />
          <h3 className="mt-3">{data.nameUser}</h3>
          <p>{data.email}</p>

          {/* Display Current Roles */}
          <div className="mt-5">
            <span className="font-bold">Quyền hiện tại: </span>
            <div className="space-x-2">
              {data.userRoles.map((ur) => (
                <Tag key={ur.role.id} color="blue" className="inline-block">
                  {ur.role.nameRole}
                </Tag>
              ))}
            </div>
          </div>
        </Col>

        {/* Form Section */}
        <Col span={16}>
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Form.Item label="Tên người dùng">
              <Input value={data.nameUser} disabled />
            </Form.Item>

            <Form.Item label="Email">
              <Input value={data.email} disabled />
            </Form.Item>

            <Form.Item
              label="Quyền"
              validateStatus={errors.roleIds ? "error" : ""}
              help={errors.roleIds?.message}
            >
              <Controller
                name="roleIds"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    mode="multiple"
                    placeholder="Chọn quyền"
                    fetchData={fetchRoles}
                    dataType="roles"
                    itemField="nameRole"
                    limit={10}
                    defaultValues={data.userRoles.map((_) => _.role)}
                    renderItem={(item) => (
                      <div>
                        <strong>{item.codeRole}</strong> -{item.nameRole}
                      </div>
                    )}
                  />
                )}
              />
            </Form.Item>

            <Form.Item className="text-right">
              <Button type="primary" htmlType="submit" loading={loading}>
                Cập nhật quyền
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default EditPermission;
