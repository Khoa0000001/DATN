import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/Button";
import ItemDiscountCard from "./ItemDiscountCode";
import {
  faTag,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

const DiscountCode: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const toggleOpen = () => setIsOpen(!isOpen);

  const applyDiscount = () => {
    if (code.trim().toUpperCase() === "WINNER") {
      setError("");
      alert("Mã giảm giá hợp lệ!");
    } else {
      setError("Mã khuyến mãi không hợp lệ.");
    }
  };

  return (
    <div className="w-full mx-auto border p-4 rounded">
      <button
        className="flex items-center gap-2 text-blue-500 font-semibold border p-2 rounded w-full text-left cursor-pointer"
        onClick={toggleOpen}
      >
        <FontAwesomeIcon icon={faTag} /> Sử dụng mã giảm giá
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className="ml-auto"
        />
      </button>

      {isOpen && (
        <div className="mt-4 border p-4 rounded bg-gray-100">
          <div className="flex justify-between items-center gap-3">
            <input
              type="text"
              placeholder="Nhập mã giảm giá/Phiếu mua hàng"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 border rounded bg-white basis-5/7"
            />
            <Button
              onClick={applyDiscount}
              color="#1982F9"
              className=" text-white px-4 py-2 rounded w-full basis-2/7"
            >
              Áp dụng
            </Button>
          </div>
          {error && <p className="text-red-500 mt-2 text-[12px]">{error}</p>}
          <div className="flex flex-col gap-3 mt-[16px]">
            <ItemDiscountCard
              title="Giảm 5%"
              code="WINNER"
              expiry="Thứ 6, 23:59 14 Thg 03, 2025"
            />
            <ItemDiscountCard
              title="Giảm 5%"
              code="WINNER"
              expiry="Thứ 6, 23:59 14 Thg 03, 2025"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountCode;
