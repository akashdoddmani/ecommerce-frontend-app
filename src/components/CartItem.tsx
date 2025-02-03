import React from "react";
import { useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "@/store/cartSlice";
import Image from "next/image";
import { PlusIcon, TrashIcon, MinusIcon } from "lucide-react";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncreaseQuantity = () => {
    dispatch(updateQuantity({ id: item.id, quantity: 1 }));
  };

  const handleDecreaseQuantity = () => {
    dispatch(updateQuantity({ id: item.id, quantity: -1 }));
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
      <div className="flex items-center w-full md:w-auto">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={100}
          height={100}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <p className="text-gray-500">Quantity: {item.quantity}</p>
        </div>
      </div>
      <div className="flex items-center mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
        <div className="flex items-center space-x-2 md:mr-4">
          <MinusIcon
            className="w-7 h-7 cursor-pointer text-primary-foreground bg-primary p-1 rounded-lg"
            onClick={handleDecreaseQuantity}
          />
          <span>{item.quantity}</span>
          <PlusIcon
            className="w-7 h-7 cursor-pointer text-primary-foreground bg-primary p-1 rounded-lg"
            onClick={handleIncreaseQuantity}
          />
        </div>
        <TrashIcon
          className="w-7 h-7 cursor-pointer text-primary bg-primary/30 border border-primary/50 p-1 rounded-lg"
          onClick={() => dispatch(removeItem(item.id))}
        />
      </div>
    </div>
  );
};

export default CartItem;
