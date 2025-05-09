import { Button, Form, Typography } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister, RegisterFormData } from "./constant";
import { CustomInput } from "@/components/customAnt";
import { toast } from "react-toastify";
import { registerUser } from "@/store/slice/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const RegisterPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schemaRegister),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data: RegisterFormData) => {
    const newData = {
      email: data.email,
      password: data.confirmPassword,
      nameUser: data.name,
    };
    const registerPromise = dispatch(registerUser(newData)).unwrap(); // unwrap() sẽ giúp bắt lỗi reject với action đã được xử lý
    toast.promise(registerPromise, {
      pending: "Đang đăng ký ...", // Trạng thái đang đợi
      success: "Vui long kiểm tra email.", // Trạng thái thành công
      error: {
        render() {
          return <span>😢 {"Đăng nhập thất bại"}</span>; // Hiển thị lỗi nếu có
        },
      },
    });
    try {
      await registerPromise;
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
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
