import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "./Button";
import { useAppDispatch } from "@/store/hooks";
import { loginUser } from "@/store/slice/authSlice";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu không được để trống"),
});

type LoginForm = yup.InferType<typeof loginSchema>;

export default function LoginUser() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      console.log("Đăng nhập với dữ liệu:", data);
      await dispatch(loginUser(data)).unwrap();
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
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
          {...register("email")}
          type="text"
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

      <Button
        color="#E30019"
        className="mx-[60px] h-[50px] text-white"
        onClick={handleSubmit(onSubmit)}
        loading={loading}
      >
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>
    </form>
  );
}
