import ItemMenuToggle from "./ItemMenuToggle";
import { faBars } from "@fortawesome/free-solid-svg-icons";
export default function MenuToggle() {
  const dataFake = [
    {
      title: "Laptop",
      icon: faBars,
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
      icon: faBars,
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
    <div className="w-[216px] bg-[#fff] relative">
      {dataFake.map((item, index) => (
        <ItemMenuToggle
          key={index}
          icon={item.icon}
          title={item.title}
          data={item.data}
        />
      ))}
    </div>
  );
}
