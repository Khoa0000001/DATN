import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import CustomTreeView from "./CustomTreeView";

export default function MenuMobile({ callBack }: { callBack: Function }) {
  const dataFake = [
    {
      title: "Laptop",
      data: [
        {
          title: "Thương hiệu",
          data: [
            {
              title: "ASUS",
            },
            {
              title: "MSI",
            },
            {
              title: "GL",
            },
            {
              title: "LENOVO",
            },
            {
              title: "TI",
            },
          ],
        },
      ],
    },
    {
      title: "Laptop",
      data: [
        {
          title: "Thương hiệu",
          data: [
            {
              title: "ASUS",
            },
            {
              title: "MSI",
            },
            {
              title: "GL",
            },
            {
              title: "LENOVO",
            },
            {
              title: "TI",
            },
          ],
        },
        {
          title: "Thương hiệu",
          data: [
            {
              title: "ASUS",
            },
            {
              title: "MSI",
            },
            {
              title: "GL",
            },
            {
              title: "LENOVO",
            },
            {
              title: "TI",
            },
          ],
        },
        {
          title: "Thương hiệu",
          data: [
            {
              title: "ASUS",
            },
            {
              title: "MSI",
            },
            {
              title: "GL",
            },
            {
              title: "LENOVO",
            },
            {
              title: "TI",
            },
          ],
        },
        {
          title: "Thương hiệu",
          data: [
            {
              title: "ASUS",
            },
            {
              title: "MSI",
            },
            {
              title: "GL",
            },
            {
              title: "LENOVO",
            },
            {
              title: "TI",
            },
          ],
        },
        {
          title: "Thương hiệu",
          data: [
            {
              title: "ASUS",
            },
            {
              title: "MSI",
            },
            {
              title: "GL",
            },
            {
              title: "LENOVO",
            },
            {
              title: "TI",
            },
          ],
        },
        {
          title: "Thương hiệu",
          data: [
            {
              title: "ASUS",
            },
            {
              title: "MSI",
            },
            {
              title: "GL",
            },
            {
              title: "LENOVO",
            },
            {
              title: "TI",
            },
          ],
        },
        {
          title: "Thương hiệu",
          data: [
            {
              title: "ASUS",
            },
            {
              title: "MSI",
            },
          ],
        },
        {
          title: "Thương hiệu",
          data: [
            {
              title: "ASUS",
            },
            {
              title: "MSI",
            },
            {
              title: "GL",
            },
            {
              title: "LENOVO",
            },
            {
              title: "TI",
            },
          ],
        },
        {
          title: "Thương hiệu",
          data: [
            {
              title: "ASUS",
            },
            {
              title: "MSI",
            },
            {
              title: "GL",
            },
            {
              title: "LENOVO",
            },
            {
              title: "TI",
            },
          ],
        },
        {
          title: "Thương hiệu",
          data: [
            {
              title: "ASUS",
            },
            {
              title: "MSI",
            },
            {
              title: "GL",
            },
            {
              title: "LENOVO",
            },
            {
              title: "TI",
            },
          ],
        },
        {
          title: "Thương hiệu",
          data: [
            {
              title: "ASUS",
            },
            {
              title: "MSI",
            },
            {
              title: "GL",
            },
            {
              title: "LENOVO",
            },
            {
              title: "TI",
            },
          ],
        },
      ],
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-between p-4 text-white bg-[var(--primary-color)] top-[0] sticky z-50">
        <div className="font-[600] text-[17px]">Danh mục sản phẩm</div>
        <div onClick={() => callBack()}>
          <FontAwesomeIcon icon={faXmark} size="2x" />
        </div>
      </div>
      <div>
        <CustomTreeView />
      </div>
      <div>
        <div>Thông tin</div>
      </div>
    </div>
  );
}
