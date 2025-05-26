/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loading from "./Loading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const validationSchema = Yup.object({
  price: Yup.number().required("Nhập giá tiền chi ra là bắt buộc"),
  purpose: Yup.string().required("Nhập mục đích sử dụng là bắt buộc"),
});

interface Component {
  id: string;
  title: string;
  value: {
    name: string;
    price: number;
  };
}

interface FormValues {
  price: string;
  purpose: string;
  components: string[];
}

export default function Counsel() {
  const [result, setResult] = useState<Component[]>();
  const { computer_components } = useAppSelector((state) => state.buildPc);
  const [listComponents] = useState(computer_components);
  const handleChon = () => {};

  return (
    <Formik<FormValues>
      initialValues={{ price: "", purpose: "", components: [] }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const newValues = {
          ...values,
          components: listComponents.filter(
            (component: any) =>
              !values.components.includes(String(component.id))
          ),
        };
        console.log("Data: ", newValues);
        try {
          const response: Component[] = [];
          setResult(response);
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, values, setFieldValue }) =>
        isSubmitting ? (
          <Loading title="Đang xử lý và đưa ra gợi ý ..." />
        ) : (
          <Form className="p-4 flex-1 overflow-auto">
            <div className="flex flex-row-reverse mb-4  mr-6">
              <button
                type="submit"
                className="bg-[#e01a1d] hover:opacity-[.8] text-white font-bold py-2 px-4 rounded cursor-pointer"
                disabled={isSubmitting}
              >
                Tư vấn
              </button>
            </div>

            {/* Giá tiền */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 items-center">
                Nhập giá tiền chi ra (VNĐ):{" "}
                {Number(values.price).toLocaleString()}
              </label>
              <Field
                type="number"
                name="price"
                min="0"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Nhập giá tiền"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Mục đích */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nhập mục đích sử dụng:
              </label>
              <Field
                as="textarea"
                name="purpose"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Nhập mục đích sử dụng"
                rows={4}
              />
              <ErrorMessage
                name="purpose"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Checkbox loại trừ */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Chọn linh kiện không muốn mua:
              </label>
              <div className="mt-2 grid grid-cols-3 gap-4">
                {listComponents.map((component: any) => {
                  const id = String(component.id);
                  const isChecked = values.components.includes(id);

                  return (
                    <div key={id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`component-${id}`}
                        checked={isChecked}
                        onChange={() => {
                          const next = isChecked
                            ? values.components.filter((cid) => cid !== id)
                            : [...values.components, id];
                          setFieldValue("components", next);
                        }}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`component-${id}`}
                        className="ml-2 block text-sm text-gray-900"
                      >
                        {component.nameCategory}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Kết quả */}
            {result && result?.length > 0 && (
              <div className="p-4 bg-gray-900 text-white min-h-screen">
                <h1 className="text-3xl font-bold text-center mb-6">
                  Cấu hình PC
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result?.map((component) => (
                    <div
                      key={component.id}
                      className="p-4 border rounded-lg bg-gray-800 shadow-lg"
                    >
                      <h2 className="text-xl font-semibold text-blue-400">
                        {component.title}
                      </h2>
                      <p className="text-gray-300">
                        Tên: {component.value.name}
                      </p>
                      <p className="text-gray-300">
                        Giá: {component.value.price.toLocaleString()} VNĐ
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row-reverse mr-[40px] mt-[18px]">
                  <div
                    onClick={handleChon}
                    className="text-[#fff] bg-[#e01a1d] p-[20px] cursor-pointer rounded-2xl hover:opacity-[.8]"
                  >
                    Chọn
                  </div>
                </div>
              </div>
            )}
          </Form>
        )
      }
    </Formik>
  );
}
