"use client";

import Button from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Summary = () => {
    const [readTerms, setReadTerms] = useState(false);
    const items = useCart((state) => state.items);
    const routes = useRouter();

    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.price);
    }, 0); 

    return (
        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">
                Order Summary
            </h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">
                        Order total
                    </div>
                    <Currency value={totalPrice}/>
                </div>

            </div>
            { items.length > 0 && (
            <div className="items-top flex space-x-2 mt-6">
                <Checkbox onCheckedChange={() => {setReadTerms(!readTerms)}} id="terms1" />
                <div className="grid gap-1.5 leading-none">
                    <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                    Accept terms and conditions
                    </label>
                    <p className="text-sm text-muted-foreground">
                    You agree to our <Link className="hover:text-gray-700 underline" href={"/terms"}>Terms of Service</Link> and <Link className="hover:text-gray-700 underline" href={"/privacy"}>Privacy Policy</Link>.
                    </p>
                </div>
            </div>
             )}
            <Button disabled={!readTerms} onClick={() => routes.push("/cart/checkout")} className="w-full mt-2">
                Checkout
            </Button>
        </div>
    )
}

export default Summary;