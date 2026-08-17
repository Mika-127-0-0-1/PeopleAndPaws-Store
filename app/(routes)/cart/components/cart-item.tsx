"use client";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import { X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

interface CartItemProps {
    data: Product;
};

const CartItem: React.FC<CartItemProps> = ({
    data
}) => {
    const cart = useCart();
    const currentQuantity = data.quantity ?? 1;
    const [quantity, setQuantity] = useState(String(currentQuantity));
    const parsedQuantity = Number(quantity);
    const quantityIsValid =
        quantity !== "" &&
        Number.isInteger(parsedQuantity) &&
        parsedQuantity >= 1 &&
        parsedQuantity <= 99;

    useEffect(() => {
        setQuantity(String(currentQuantity));
    }, [currentQuantity]);

    const onRemove = () => {
        cart.removeItem(data.id);
    }

    const onQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nextQuantity = event.target.value;
        const parsedNextQuantity = Number(nextQuantity);

        setQuantity(nextQuantity);

        if (
            nextQuantity !== "" &&
            Number.isInteger(parsedNextQuantity) &&
            parsedNextQuantity >= 1 &&
            parsedNextQuantity <= 99
        ) {
            cart.updateQuantity(data.id, parsedNextQuantity);
        }
    }

    const onQuantityBlur = () => {
        if (!quantityIsValid) {
            setQuantity(String(currentQuantity));
        }
    }

    return (
        <li className="flex py-6 boarder-b">
            <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                <Image 
                fill
                src={data.images[0].url}
                alt=""
                className="object-cover object-center"/>
            </div>
            <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="absolute z-10 right-0 top-0">
                    <IconButton onClick={onRemove} icon={<X size={15} className="text-neutral-500"/>}/>
                </div>
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold text-black">
                            {data.name}
                        </p>
                    </div>

                    <div className="mt-1 flex text-sm">
                        {/* <p className="text-gray-500"> {data.color.name} </p> */}
                        <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4"> {data.size.name} </p>
                    </div>
                    <Currency value={data.price}/>
                    <div className="mt-3">
                        <label htmlFor={`cart-quantity-${data.id}`} className="mb-1 block text-sm font-medium text-gray-700">
                            Quantity
                        </label>
                        <Input
                            id={`cart-quantity-${data.id}`}
                            type="number"
                            min={1}
                            max={99}
                            step={1}
                            inputMode="numeric"
                            value={quantity}
                            onChange={onQuantityChange}
                            onBlur={onQuantityBlur}
                            aria-invalid={!quantityIsValid}
                            aria-describedby={!quantityIsValid ? `cart-quantity-error-${data.id}` : undefined}
                            className="w-24"
                        />
                        {!quantityIsValid && (
                            <p id={`cart-quantity-error-${data.id}`} className="mt-1 text-sm text-red-600" role="alert">
                                Enter a whole number from 1 to 99.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </li>
    )
}

export default CartItem;
