"use client";

import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const NavbarActions = () => {
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const router = useRouter();
    const cart = useCart();

    if(!isMounted) {
        return null;
    }

    return (
        <div className="ml-auto flex items-center gap-x-4">
             {/* <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn> */}
            <Button onClick={() => router.push("/cart")} className="flex items-center rounded-full bg-black py-2">
                <ShoppingBag 
                size={20}
                color="white"/>
                <span className="ml-2 text-sm font-medium text-white">
                    {cart.items.length}
                </span>
            </Button>
        </div>
    )
}

export default NavbarActions;