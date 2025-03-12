import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/rudex/store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getBuildPCResponse } from "@/apis/apiCounsel";
import Loading from "./Loading";
import Button from "@/components/Button";
import { useDispatch } from "react-redux";
import { updateComponentValue } from "@/rudex/DataBuildPCSlice";
import { AppDispatch } from "@/rudex/store";

const validationSchema = Yup.object({
  price: Yup.number().required("Nhập giá tiền chi ra là bắt buộc"),
  purpose: Yup.string().required("Nhập mục đích sử dụng là bắt buộc"),
});
interface Component {
  id: number;
  title: string;
  value: {
    name: string;
    price: number;
  };
}

export default function Counsel() {
  const dispatch = useDispatch<AppDispatch>();
  const dataBuildPC = useSelector(
    (state: RootState) => state.DataBuildPC.components
  );
  const [result, setResult] = useState<Component[]>();

  const handleChon = () => {
    result?.forEach((component: Component) => {
      dispatch(
        updateComponentValue({
          id: component.id,
          newValue: {
            id: 1,
            name: component.value.name,
            price: Number(component.value.price),
            img: "https://product.hstatic.net/200000722513/product/pc_case_msi_-_70_ddeb58e9f4734404b74d621a25441f44_medium.png",
          },
        })
      );
    });
  };

  return (
    <Formik
      initialValues={{ price: "", purpose: "", components: {} }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const response = await getBuildPCResponse(
            Number(values.price),
            values.purpose,
            values.components
          );
          setResult(response);
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false); // Cho phép submit tiếp
          //   resetForm(); // Reset form về giá trị ban đầu
        }
      }}
    >
      {({ isSubmitting, values }) =>
        isSubmitting ? (
          <Loading title="Đang xử lý và đưa ra gợi ý ..." />
        ) : (
          <Form className="p-4 flex-1 overflow-auto">
            <div className="flex flex-row-reverse mb-4 sticky top-0 mr-6">
              <button
                type="submit"
                className="bg-[#e01a1d] hover:opacity-[.8] text-white font-bold py-2 px-4 rounded cursor-pointer"
                disabled={isSubmitting}
              >
                Tư vấn
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 items-center">
                Nhập giá tiền chi ra (VNĐ): {values.price.toLocaleString()}
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
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Chọn linh kiện không muốn mua:
              </label>
              <div className="mt-2 grid grid-cols-3 gap-4">
                {dataBuildPC.map((component) => (
                  <div key={component.id} className="flex items-center">
                    <Field
                      type="checkbox"
                      id={`component-${component.id}`}
                      name={`components.${component.title}`}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`component-${component.id}`}
                      className="ml-2 block text-sm text-gray-900"
                    >
                      {component.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {result && (
              <div className="p-4 bg-gray-900 text-white min-h-screen">
                <h1 className="text-3xl font-bold text-center mb-6">
                  Cấu hình PC
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.map((component) => (
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
                        Giá: {component.value.price} VNĐ
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row-reverse mr-[40px]">
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
