import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface CartItemProps {
  image: string;
  name: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  onRemove: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  image,
  name,
  price,
  oldPrice,
  quantity,
  onRemove,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <div className="flex justify-between">
        <div className="flex flex-col justify-center items-center">
          <img
            src={image}
            alt={name}
            className="w-32 object-cover border p-[3px]"
          />
          <button
            className="flex items-center text-gray-500 hover:text-red-500 mt-2 cursor-pointer"
            onClick={onRemove}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-1" /> Xóa
          </button>
        </div>
        <div className="items-center ml-[10px]">
          <h2 className="text-[14px] font-medium">{name}</h2>
        </div>
      </div>
      <div>
        <div className="text-right">
          <p className="text-red-600 text-xl font-semibold">
            {price.toLocaleString()}đ
          </p>
          {oldPrice && (
            <p className="text-gray-400 line-through text-sm">
              {oldPrice.toLocaleString()}đ
            </p>
          )}
        </div>
        <div className="flex items-center border rounded mt-[18px]">
          <button
            className="px-3 py-1 border-r hover:bg-gray-100 cursor-pointer"
            onClick={onDecrease}
          >
            -
          </button>
          <span className="px-4">{quantity}</span>
          <button
            className="px-3 py-1 border-l hover:bg-gray-100 cursor-pointer"
            onClick={onIncrease}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
