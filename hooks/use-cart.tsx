import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";
import toast from "react-hot-toast";

interface CartStore {
    items: Product[];
    addItem: (data: Product) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
};

const useCart = create(
    persist<CartStore>((set, get) => ({
        items: [],
        addItem: (data: Product) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.id === data.id);

            if(existingItem) {
                return toast("Item already in cart.");
            }

            set({ items: [...get().items, { ...data, quantity: data.quantity ?? 1 }] });
            toast.success("Item added to cart.");
        },
        updateQuantity: (id: string, quantity: number) => {
            if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
                return;
            }

            set({
                items: get().items.map((item) =>
                    item.id === id ? { ...item, quantity } : item
                ),
            });
        },
        removeItem: (id: string) => {
            set({ items: [...get().items.filter((item) => item.id !== id)] });
            toast.success("Item removed from cart.");
        },
        removeAll: () => set({items: []}),
    }), {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage)
    })
)

export default useCart;
