import { Button, Form, Typography } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister, RegisterFormData } from "./constant";
import { CustomInput } from "@/components/customAnt";

const { Title } = Typography;

const RegisterPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schemaRegister),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Đăng ký với:", data);
  };

  return (
    <div className="max-w-[400px] mx-auto pt-16">
      <Title level={2}>Đăng ký</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <CustomInput
          label="Tên"
          name="name"
          control={control}
          errors={errors}
        />
        <CustomInput
          label="Email"
          name="email"
          control={control}
          errors={errors}
        />
        <CustomInput
          label="Mật khẩu"
          name="password"
          type="password"
          control={control}
          errors={errors}
        />
        <CustomInput
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          type="password"
          control={control}
          errors={errors}
        />

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting} block>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
