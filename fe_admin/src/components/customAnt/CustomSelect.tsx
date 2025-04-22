/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const { Option } = Select;

interface CustomSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  mode: "multiple" | "tags" | undefined;
  placeholder: string;
  fetchData: (params: any) => any;
  dataType: string;
  itemField: string;
  limit: number;
  defaultValues: any[];
  renderItem?: (item: any) => React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  mode,
  placeholder,
  fetchData,
  dataType,
  itemField,
  limit,
  defaultValues,
  renderItem,
}) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(
    (state) => state[dataType as keyof typeof state] as any
  );
  const items = data[dataType];
  const { loading, meta } = data;

  const [localItems, setLocalItems] = useState<any[]>(defaultValues);

  // Fetch initial data
  useEffect(() => {
    console.log(defaultValues);
    dispatch(fetchData({ page: 1, limit }));
    setLocalItems([]);
  }, [dispatch, fetchData, limit]);

  // Infinite scroll
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    const isNearBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 20;

    const isLastPage = meta.page >= meta.total / limit;

    if (isNearBottom && !loading && !isLastPage) {
      console.log("Fetching more data...");
      dispatch(fetchData({ page: meta.page + 1, limit }));
    }
  };

  // Merge new items into local state
  useEffect(() => {
    if (items?.length) {
      setLocalItems((prev) => {
        const allItems = [...prev, ...items];
        const unique = Array.from(
          new Map(allItems.map((item) => [item.id, item])).values()
        );
        return unique;
      });
    }
  }, [items]);

  return (
    <Select
      value={value}
      onChange={onChange}
      mode={mode}
      placeholder={placeholder}
      style={{ width: "100%" }}
      loading={loading && localItems.length === 0}
      onPopupScroll={handleScroll}
      getPopupContainer={(trigger) => trigger.parentNode}
    >
      {localItems.map((item: any) => (
        <Option key={item.id} value={item.id}>
          {renderItem ? renderItem(item) : item[itemField]}
        </Option>
      ))}
    </Select>
  );
};

export default CustomSelect;
