import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "./Button";
import { useAppDispatch } from "@/store/hooks";
import { registerUser } from "@/store/slice/authSlice";

// Schema validation
const registerSchema = yup.object({
  name: yup.string().required("Tên không được để trống"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu không được để trống"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
});

type RegisterForm = yup.InferType<typeof registerSchema>;

export default function RegisterUser() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      console.log("Đăng ký với:", data);
      const newData = {
        email: data.email,
        password: data.confirmPassword,
        nameUser: data.name,
      };
      await dispatch(registerUser(newData)).unwrap();
      alert("Vui lòng kiểm tra email để xác thực tài khoản");
    } catch (err) {
      console.error("Lỗi đăng ký:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3"
      noValidate
    >
      <div className="mx-[16px] mt-[16px]">
        <input
          {...register("name")}
          type="text"
          placeholder="Họ và tên"
          className="p-[10px] w-full border border-gray-500"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="mx-[16px]">
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="p-[10px] w-full border border-gray-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="mx-[16px]">
        <input
          {...register("password")}
          type="password"
          placeholder="Mật khẩu"
          className="p-[10px] w-full border border-gray-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div className="mx-[16px] mb-[16px]">
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Nhập lại mật khẩu"
          className="p-[10px] w-full border border-gray-500"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        color="#E30019"
        className="mx-[60px] h-[50px] text-white"
        onClick={handleSubmit(onSubmit)}
        loading={loading}
      >
        {loading ? "Đang đăng ký..." : "Đăng ký"}
      </Button>
    </form>
  );
}
