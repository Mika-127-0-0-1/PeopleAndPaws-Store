"use client";

import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import SumItem from "./summery-item";

const ListSummary = () => {
    const items = useCart((state) => state.items);
    const cart = useCart();

    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.price);
    }, 0); 

    return (
        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">
                Order summary
            </h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <ul>
                        {cart.items.map((item) => (
                            <SumItem 
                            key={item.id}
                            data={item}
                            />
                        ))}
                    </ul>
                </div>
                <div className="text-base border-t font-medium text-gray-900">
                    Order total
                </div>
                <Currency value={totalPrice}/>

            </div>
            {/* <Button onClick={() => routes.push("/cart/checkout")} className="w-full mt-6">
                Checkout
            </Button> */}
        </div>
    )
}

export default ListSummary;
