import { Store } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}`;
const getStore = async (): Promise<Store> => {
    const res = await fetch(`${URL}`, { cache: "no-store" });

    if (!res.ok) {
        throw new Error("Failed to load store settings");
    }

    return res.json()
}

export default getStore;
