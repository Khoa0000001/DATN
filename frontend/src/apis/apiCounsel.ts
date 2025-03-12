import axios from "axios";

const apiKey = import.meta.env.VITE_MISTRAL_API_KEY || "";
const apiUrl =
  import.meta.env.VITE_MISTRAL_API_URL ||
  "https://api.mistral.ai/v1/chat/completions";

const allParts = [
  { id: 1, title: "CPU" },
  { id: 2, title: "Mainboard" },
  { id: 3, title: "Card màn hình" },
  { id: 4, title: "RAM" },
  { id: 5, title: "Ổ cứng SSD" },
  { id: 6, title: "Ổ cứng HDD" },
  { id: 7, title: "Case máy tính" },
  { id: 8, title: "Nguồn máy tính" },
  { id: 9, title: "Tản nhiệt CPU" },
  { id: 10, title: "Màn hình" },
  { id: 11, title: "Chuột" },
  { id: 12, title: "Bàn phím" },
  { id: 13, title: "Tai nghe gaming" },
  { id: 14, title: "Phần mềm" },
];

const extractJsonFromText = (text: string): string => {
  const match = text.match(/\[([\s\S]*?)\]/);
  return match ? match[0] : "";
};

export const getBuildPCResponse = async (
  budget: number,
  usage: string,
  existingParts: { [key: string]: boolean }
) => {
  const missingParts = allParts.filter((part) => !existingParts[part.title]);

  const prompt = `
Bạn là một chuyên gia lắp ráp máy tính.  
Hãy tư vấn cấu hình PC với ngân sách **${budget} VND**, phục vụ cho **${usage}**.  

🛠 **Linh kiện đã có**: ${Object.keys(existingParts)
    .map((item) => `"${item}"`)
    .join(", ")}  
⛔ **Không cần mua lại những linh kiện này!**  

📋 **Danh sách linh kiện cần mua (JSON format, không bao gồm linh kiện đã có)**:  

[
  ${missingParts
    .map(
      (part) => `{
    "id": ${part.id},
    "title": "${part.title}",
    "value": { "name": "Tên ${part.title} phù hợp", "price": "Giá phù hợp VND và là số nguyên" }
  }`
    )
    .join(",\n  ")}
]

Chỉ trả về JSON đúng định dạng, không giải thích, không bình luận thêm.
`.trim();

  try {
    const response = await axios.post(
      apiUrl,
      {
        model: "mistral-tiny",
        messages: [
          { role: "system", content: "Bạn là một chuyên gia máy tính." },
          { role: "user", content: prompt },
        ],
        max_tokens: 1500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    let rawText = response.data.choices[0].message.content.trim();
    let jsonText = extractJsonFromText(rawText);

    if (!jsonText) {
      throw new Error("Không tìm thấy JSON hợp lệ trong phản hồi của Mistral.");
    }

    return JSON.parse(jsonText);
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(
      `Error: ${error.response?.data?.error?.message || error.message}`
    );
  }
};
