// components/SuccessMessage.tsx
import { useEffect } from "react";

interface SuccessMessageProps {
  message: string;
  onClose: () => void;
}

export default function SuccessMessage({
  message,
  onClose,
}: SuccessMessageProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000); // Tự động đóng sau 2s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md z-50">
      {message}
    </div>
  );
}
