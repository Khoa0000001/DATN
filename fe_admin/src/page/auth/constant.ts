import * as yup from "yup";

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Bắt buộc nhập email"),
  password: yup
    .string()
    .min(6, "Ít nhất 6 ký tự")
    .required("Bắt buộc nhập mật khẩu"),
});
export interface LoginFormData {
  email: string;
  password: string;
}

export const schemaRegister = yup.object().shape({
  name: yup.string().required("Bắt buộc nhập tên"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Bắt buộc nhập email"),
  password: yup
    .string()
    .min(6, "Ít nhất 6 ký tự")
    .required("Bắt buộc nhập mật khẩu"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu không khớp")
    .required("Bắt buộc xác nhận mật khẩu"),
});

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
