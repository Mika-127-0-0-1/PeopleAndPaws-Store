// import DOMPurify from 'dompurify';

import getStore from "@/actions/get-store";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms and Conditions",
    alternates: { canonical: "/terms" },
};

export const revalidate =0;

const TermsPage = async () => {
    // const products = await getProducts({ isFeatured: true });
    const store = await getStore();

    return (
        < >
        <div className="p-10">
            <h1 className="text-center text-3xl font-bold">Terms and Conditions</h1>
            <div className="space-y-10" dangerouslySetInnerHTML={{__html: store.term_condition}}>
            </div>
        </div>
        </>
    )
}

export default TermsPage;
