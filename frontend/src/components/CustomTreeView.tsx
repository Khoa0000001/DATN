import { useState } from "react";

// Định nghĩa kiểu dữ liệu cho mỗi node
interface TreeNodeProps {
  id: string;
  label: string;
  children?: TreeNodeProps[];
}

// Dữ liệu mẫu (có thể thay bằng API)
const treeData: TreeNodeProps[] = [
  {
    id: "1",
    label: "Dự án",
    children: [
      { id: "1-1", label: "Báo cáo.docx" },
      { id: "1-2", label: "Kế hoạch.xlsx" },
      {
        id: "1-3",
        label: "Hình ảnh",
        children: [
          { id: "1-3-1", label: "Banner.png" },
          { id: "1-3-2", label: "Logo.svg" },
        ],
      },
    ],
  },
  {
    id: "2",
    label: "Tài liệu",
    children: [
      { id: "2-1", label: "Hợp đồng.pdf" },
      {
        id: "2-2",
        label: "Thư viện",
        children: [
          { id: "2-2-1", label: "React.docx" },
          { id: "2-2-2", label: "Node.js.pdf" },
        ],
      },
    ],
  },
];

// Component đệ quy hiển thị mỗi node trong TreeView
const TreeNode: React.FC<{ node: TreeNodeProps }> = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pl-4">
      <div
        className="flex items-center cursor-pointer py-1 hover:bg-gray-200 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {node.children && (
          <span className="mr-2 text-gray-500">{isOpen ? "▼" : "▶"}</span>
        )}
        {node.label}
      </div>

      {isOpen && node.children && (
        <div className="ml-4 border-l border-gray-300 pl-2">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

// Component chính
const CustomTreeView: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-96">
      {treeData.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
};

export default CustomTreeView;
