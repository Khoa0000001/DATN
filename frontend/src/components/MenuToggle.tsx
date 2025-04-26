/* eslint-disable @typescript-eslint/no-explicit-any */
import ItemMenuToggle from "./ItemMenuToggle";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchCategories } from "@/store/slice/categorySlice";
export default function MenuToggle() {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);

  const newCategories = categories.map((item: any) => {
    return {
      title: item.nameCategory,
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
    };
  });
  useEffect(() => {
    dispatch(fetchCategories({})).unwrap(); // Pass an empty object or the required argument(s)
  }, [dispatch]);
  return (
    <div className="w-[216px] bg-[#fff] relative">
      {newCategories.map((item: any, index: number) => (
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
