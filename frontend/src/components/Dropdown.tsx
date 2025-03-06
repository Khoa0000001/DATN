import { useState, ReactNode } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

interface DropdownProps {
  trigger: ReactNode; // Giao diện nút bấm
  content: ReactNode; // Giao diện nội dung hiển thị khi mở
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, content }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Tippy
        content={content}
        interactive={true}
        visible={visible}
        theme="light"
        onClickOutside={() => setVisible(false)}
        placement="bottom"
        trigger="click"
        offset={[0, 5]}
      >
        <button onClick={() => setVisible(!visible)}>{trigger}</button>
      </Tippy>
      <style>
        {`
          .tippy-content{
            padding:0
          }
        `}
      </style>
    </div>
  );
};

export default Dropdown;
