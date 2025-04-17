import { Button, Form, Typography } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin, LoginFormData } from "./constant";
import { CustomInput } from "@/components/customAnt";
import { useAppDispatch } from "@/store/hooks";
import { loginUser, logout } from "@/store/slice/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    const loginPromise = dispatch(loginUser(data)).unwrap();

    toast.promise(loginPromise, {
      pending: "Đang đăng nhập...",
      success: "Đăng nhập thành công 🎉",
      error: {
        render({ data }) {
          return <span>😢 {String(data) || "Đăng nhập thất bại!"}</span>;
        },
      },
    });

    try {
      await loginPromise;
      navigate("/"); // ✅ Điều hướng khi login thành công
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    dispatch(logout());
  }, []);
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
