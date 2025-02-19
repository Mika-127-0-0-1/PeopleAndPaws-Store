import { Socials } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/socialLinks`;
// const storeId = `${process.env.UNIQUE_STORE_ID}`;

const getSocials = async (): Promise<Socials[]> => {
    const res = await fetch(URL);

    return res.json()
}

export default getSocials;