import Image from "next/image";
import { calculateOriginalPrice } from "@/utils";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "@/store/cartSlice";
import { RootState } from "@/store/store";
import Rating from "./Rating";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  rating: number;
  discountPercentage: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === product.id.toString());

  const handleCartAction = () => {
    if (isInCart) {
      dispatch(removeItem(product.id.toString()));
    } else {
      dispatch(
        addItem({
          id: product.id.toString(),
          name: product.title,
          price: product.price,
          quantity: 1,
          imageUrl: product.images[0],
        })
      );
    }
  };

  return (
    <Link href={`/${product.id}`}>
      <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col  justify-between relative h-[400px]">
        {product.discountPercentage > 0 && (
          <div className="bg-yellow-500 rounded-tr-lg rounded-bl-lg px-2 py-1 absolute top-0 right-0">
            <p className="text-sm font-medium">
              {product.discountPercentage}% Off
            </p>
          </div>
        )}
        <div className="flex flex-col space-y-1.5 ">
          <Image
            src={product.images[0]}
            alt={product.title}
            width={400}
            height={200}
            className="w-full h-48 object-contain"
          />
        </div>
        <div className="p-4 text-2xl font-semibold leading-none tracking-tight">
          <div className="text-base font-normal text-black">
            {product.title}
          </div>
          <Rating rating={product.rating} />

          <div className="flex flex-row items-center gap-2">
            <p className="text-lg font-medium text-black">
              ${product.price.toFixed(2)}
            </p>
            <s className="line-through text-black">
              <p className="text-lg font-medium opacity-80 text-black">
                $
                {calculateOriginalPrice(
                  product.price,
                  product.discountPercentage
                )}
              </p>
            </s>
          </div>
        </div>
        <div className="p-4 pt-0 ">
          <button
            className={`w-full rounded-md text-sm py-2 ${
              isInCart
                ? "bg-primary/20 text-primary border border-primary/50"
                : "bg-primary text-primary-foreground"
            }`}
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation when clicking the button
              handleCartAction();
            }}
          >
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
}
