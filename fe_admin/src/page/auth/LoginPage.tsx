import { Button, Form, Typography } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin, LoginFormData } from "./constant";
import { CustomInput } from "@/components/customAnt";
import { useAppDispatch } from "@/store/hooks";
import { loginUser } from "@/store/slice/authSlice";
import { notification } from "antd";

const { Title } = Typography;

const LoginPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schemaLogin),
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      // Nếu unwrap() không throw => login thành công
      notification.success({
        message: "Đăng nhập thành công",
        description: "Chào mừng bạn quay trở lại hệ thống.",
        placement: "topRight",
      });

      // Redirect nếu cần ở đây
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      notification.error({
        message: "Đăng nhập thất bại",
        description: error || "Vui lòng kiểm tra lại thông tin đăng nhập.",
        placement: "topRight",
      });
    }
  };

  return (
    <div className="max-w-[400px] mx-auto pt-16">
      <Title level={2}>Đăng nhập</Title>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
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
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting} block>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
