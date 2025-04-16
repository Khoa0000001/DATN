/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/CustomAnt/InputField.tsx
import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

interface InputFieldProps {
  label: string;
  name: string;
  control: any;
  errors: any;
  type?: string;
}

const CustomInput = ({
  label,
  name,
  control,
  errors,
  type = "text",
}: InputFieldProps) => {
  return (
    <Form.Item
      label={label}
      validateStatus={errors[name] ? "error" : ""}
      help={errors[name]?.message}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password {...field} />
          ) : (
            <Input {...field} type={type} />
          )
        }
      />
    </Form.Item>
  );
};

export default CustomInput;
