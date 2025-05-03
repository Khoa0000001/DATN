/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Chatbot.tsx
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { chatBotQuestion, fetchChatHistory } from "@/store/slice/chatbotSlice";

const Chatbot = () => {
  const dispatch = useAppDispatch();
  const { chatHistory, error } = useAppSelector((state: any) => state.chatbots);
  const { userInfo } = useAppSelector((state: any) => state.auth);
  const userId = userInfo?.userId;
  const [question, setQuestion] = useState("");
  const [showQustion, setShowQuestion] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchChatHistory({ userId, page: 1, limit: 999 }));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    // Scroll to bottom when chatHistory or showQustion changes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, showQustion]);

  const handleSendMessage = async () => {
    if (question.trim()) {
      setShowQuestion(question);
      setQuestion("");
      await dispatch(chatBotQuestion({ q: question, userId }));
      setShowQuestion("");
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg w-full max-w-md mx-auto h-[60vh] shadow-lg border border-gray-200">
      <div
        className="flex-1 overflow-y-auto p-4 bg-white space-y-2"
        ref={chatContainerRef}
      >
        {error && <div className="text-red-500">{error}</div>}

        {chatHistory?.map((msg: any, index: number) => (
          <div key={index} className="space-y-2">
            <div
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-[75%] text-sm whitespace-pre-wrap ${
                  msg.sender === "user"
                    ? "bg-[#e30019] text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.question}
              </div>
            </div>

            {msg.answer && (
              <div
                className={`flex ${
                  msg.sender === "user" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-[75%] text-sm whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-[#e30019] text-white"
                  }`}
                >
                  {msg.answer}
                </div>
              </div>
            )}
          </div>
        ))}

        {showQustion && (
          <div className="space-y-2">
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-lg max-w-[75%] text-sm whitespace-pre-wrap bg-gray-100 text-gray-800">
                {showQustion}
              </div>
            </div>
            <div className="flex justify-end">
              <div className="px-4 py-2 rounded-lg max-w-[75%] text-sm whitespace-pre-wrap bg-[#e30019] text-white flex items-center gap-1">
                <span className="flex space-x-1 ml-1">
                  <span className="animate-bounce [animation-delay:-0.2s]">
                    .
                  </span>
                  <span className="animate-bounce [animation-delay:0s]">.</span>
                  <span className="animate-bounce [animation-delay:0.2s]">
                    .
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 flex items-center gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e30019]"
          placeholder="Nhập câu hỏi của bạn..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-[#e30019] hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-all"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
