"use client";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";
import { useSearchParams } from "next/navigation";
import { toast } from 'react-hot-toast';
import { CircleCheckBig } from "lucide-react";

const CartPage = () => {
    const [isMounted, setMounted] = useState(false);
    const [isOrder, setOrder] = useState(false);
    const cart = useCart();
    const searchParams = useSearchParams();
    const removeAll = useCart((state) => state.removeAll);

    useEffect(() => {
        setMounted(true);
    }, []);

    // if cart length > 0 setOrder to false

    useEffect(() => {
        if(searchParams.get("success")) {
            setOrder(true);
            removeAll();
            toast.success("Order Placed.");
        }

        if(searchParams.get("canceled")) {
            toast.error("Something went wrong.");
        }
    }, [searchParams, removeAll]);

    if(!isMounted) {
        return null;
    }

    return (
        <div className="bg-white">
            <Container>
                {isOrder 
                // && cart.items.length ===0 
                ? ( 
                <div>
                    <div className="bg-green-100 border flex justify-center border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Success! </strong>
                        <span className="block sm:inline"> Order has been placed successfully.</span>
                    </div>
                    <div className="flex justify-center items-center">
                        <CircleCheckBig color="green" size={200}/>
                    </div>
                    <div>
                        <p><strong>Thank you for your order!</strong></p>
                        <p>You’ll find full payment and banking details in the invoice we’ve emailed you. Your order is currently under review and being prepared for approval.</p>
                        <br/>
                        <p>Kindly allow up to one business day for us to finalize packaging and arrange transport.</p>
                        <br/>
                        <p>If you’ve selected in-store collection, please make payment at the store and call ahead to confirm product availability. Some items may be stored in our warehouse and need to be moved to the front shelf before your arrival.</p>
                        <br/>
                        <p><strong>Note:</strong> No items will be released or shipped until payment reflects in our bank account.</p>
                        <br/>
                        <p>Should you need to make any changes or have questions, feel free to contact us—we&apos;re here to help!</p>
                        <br/>
                        {/* <p><strong>Banking details</strong></p><br/>
                        <p><strong>Account holder:</strong> Sonet</p> */}
                        {/* <p><strong>Account type:</strong> Cheque</p> */}
                        {/* <p><strong>Bank name:</strong> Tyme Bank</p>
                        <p><strong>Account number:</strong> 510 483 821 59</p> 
                        <p><strong>Branch code:</strong> 678910</p>  */}

                    </div>
                </div>
                ) : (
                <div className="px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-black"> Shopping Cart </h1>
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                        <div className="lg:col-span-7">
                            {cart.items.length ===0 && <p className="text-neutral-500">No items added to the cart</p>}
                            <ul>
                                {cart.items.map((item) => (
                                    <CartItem 
                                    key={item.id}
                                    data={item}
                                    />
                                ))}
                            </ul>
                        </div>
                        <Summary />
                    </div>
                </div>
                )}
            </Container>
        </div>
    )
}

export default CartPage;
