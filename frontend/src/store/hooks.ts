import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";

// ✅ Dispatch có type
export const useAppDispatch = () => useDispatch<AppDispatch>();

// ✅ Selector có type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
