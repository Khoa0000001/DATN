/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface DataBuildPC {
  id: number;
  title: string;
  image: string;
  color: string;
  value: any; // Có thể thay 'any' bằng kiểu dữ liệu cụ thể nếu biết rõ
}
interface DataBuildPCState {
  components: DataBuildPC[];
}

const initialState: DataBuildPCState = {
  components: [
    {
      id: 1,
      title: "CPU",
      image:
        "https://buildpc.gearvn.com/static/media/CPU.9ce6ac22d169469adf67.png",
      color: "#00A9A5",
      value: null,
    },
    {
      id: 2,
      title: "Mainboard",
      image:
        "https://buildpc.gearvn.com/static/media/Main.90df6990ad7b6e029d39.png",
      color: "#F76C5E",
      value: null,
    },
    {
      id: 3,
      title: "Card màn hình",
      image:
        "https://buildpc.gearvn.com/static/media/VGA.1f5313095849b98ab0e2.png",
      color: "#F7C548",
      value: null,
    },
    {
      id: 4,
      title: "RAM",
      image:
        "https://buildpc.gearvn.com/static/media/RAM.aa0d36866c3d79265cd9.png",
      color: "#1E4174",
      value: null,
    },
    {
      id: 5,
      title: "Ổ cứng SSD",
      image:
        "https://buildpc.gearvn.com/static/media/SSD.7f8d50f5a0e02ad1f36e.png",
      color: "#9C27B0",
      value: null,
    },
    {
      id: 6,
      title: "Ổ cứng HDD",
      image:
        "https://buildpc.gearvn.com/static/media/HDD.2aa1bd900c3adcf8215f.png",
      color: "#0077B6",
      value: null,
    },
    {
      id: 7,
      title: "Case máy tính",
      image:
        "https://buildpc.gearvn.com/static/media/Case.3fd61efef0de0fdbecb5.png",
      color: "#8B0000",
      value: null,
    },
    {
      id: 8,
      title: "Nguồn máy tính",
      image:
        "https://buildpc.gearvn.com/static/media/Nguon.75b7ba0309279f7248ba.png",
      color: "#FF6F61",
      value: null,
    },
    {
      id: 9,
      title: "Tản nhiệt CPU",
      image:
        "https://buildpc.gearvn.com/static/media/Cooling.b19737aa96d276934a00.png",
      color: "#39FF14",
      value: null,
    },
    {
      id: 10,
      title: "Màn hình",
      image:
        "https://buildpc.gearvn.com/static/media/Monitor.987fbcc5e8ae8167835a.png",
      color: "#FFD700",
      value: null,
    },
    {
      id: 11,
      title: "Chuột",
      image:
        "https://buildpc.gearvn.com/static/media/Mouse.268e9ccd3269b5157406.png",
      color: "#2E2E2E",
      value: null,
    },
    {
      id: 12,
      title: "Bàn phím",
      image:
        "https://buildpc.gearvn.com/static/media/Keyboard.dd3d5b94dd3943534aeb.png",
      color: "#8B5A2B",
      value: null,
    },
    {
      id: 13,
      title: "Tai nghe gaming",
      image:
        "https://buildpc.gearvn.com/static/media/Headset.dec76d8c4b03bea64200.png",
      color: "#A7C7E7",
      value: null,
    },
    {
      id: 14,
      title: "Phần mềm",
      image:
        "https://buildpc.gearvn.com/static/media/Windows.09078f78edba6041b859.png",
      color: "#FFB6C1",
      value: null,
    },
  ],
};

const DataBuildPCSlice = createSlice({
  name: "DataBuildPC",
  initialState,
  reducers: {
    updateComponentValue: (
      state,
      action: PayloadAction<{ id: number; newValue: any }>
    ) => {
      const { id, newValue } = action.payload;
      const component = state.components.find((item) => item.id === id);
      if (component) {
        component.value = newValue;
      }
      console.log(JSON.stringify(state, null, 2));
    },
    resetComponent: () => initialState, // Reset về giá trị ban đầu
  },
});

export const { updateComponentValue, resetComponent } =
  DataBuildPCSlice.actions;
export default DataBuildPCSlice.reducer;
