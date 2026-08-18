"use client";

import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCart from "@/hooks/use-cart";
import { Input } from "@/components/ui/input";

interface InfoProps {
    data: Product
}

const formSchema = z.object({
    quantity: z.coerce.number({ invalid_type_error: "Enter a quantity from 1 to 99." })
        .int("Quantity must be a whole number.")
        .min(1, "Quantity must be at least 1.")
        .max(99, "Quantity cannot be more than 99."),
});

type QuantityFormValues = z.infer<typeof formSchema>;

const Info: React.FC<InfoProps> = ({
    data
}) => {
    const cart = useCart();
    const { register, handleSubmit, formState: { errors } } = useForm<QuantityFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { quantity: 1 },
    });

    const onSubmit = ({ quantity }: QuantityFormValues) => {
        cart.addItem({ ...data, quantity });
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-2xl text-gray-900">
                    <Currency value={data?.price}/>
                </p>
            </div>
            {data.description && (
                <div className="mt-6">
                    <h2 className="font-semibold text-gray-900">Description</h2>
                    <p className="mt-2 whitespace-pre-line leading-7 text-gray-600">
                        {data.description}
                    </p>
                </div>
            )}
            <hr className="my-4"/>
            <div className="flex flex-col gap-y-6">
                <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Size:</h3>
                    <div>
                        {data?.size?.name}
                    </div>
                </div>
                {/* <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Color:</h3>
                    <div className="h-6 w-6 rounded-full border border-gray-600" style={{ backgroundColor: data?.color?.value}}/>
                </div> */}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
                <div className="flex items-end gap-x-3">
                    <div>
                        <label htmlFor={`quantity-${data.id}`} className="mb-2 block font-semibold text-black">Quantity</label>
                        <Input id={`quantity-${data.id}`} type="number" min={1} max={99} step={1} inputMode="numeric" className="w-24" aria-invalid={Boolean(errors.quantity)} {...register("quantity")} />
                    </div>
                    <Button type="submit" className="flex items-center gap-x-2">
                        Add To Cart
                        <ShoppingCart />
                    </Button>
                </div>
                {errors.quantity && <p className="mt-2 text-sm text-red-600" role="alert">{errors.quantity.message}</p>}
            </form>
        </div>
    )
}

export default Info;
