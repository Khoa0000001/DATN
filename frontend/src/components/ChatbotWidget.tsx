import { useState } from "react";
import Chatbot from "@/pages/chatbot";
import { X, MessageCircle } from "lucide-react";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="relative w-[400px] max-h-[90vh]">
          <div className="flex justify-between items-center bg-[#e30019] text-white px-4 py-2 rounded-t-lg">
            <span className="font-semibold">Chatbot Hỗ Trợ Bán Hàng</span>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:opacity-70"
            >
              <X size={20} />
            </button>
          </div>
          <Chatbot />
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#e30019] text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;
