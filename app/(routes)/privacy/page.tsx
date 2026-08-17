// import DOMPurify from 'dompurify';

import getStore from "@/actions/get-store";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    alternates: { canonical: "/privacy" },
};

export const revalidate =0;

const PrivacyPage = async () => {
    const store = await getStore();
    return (
        < >
        <div className="p-10">
            <h1 className="text-center text-3xl font-bold">Privacy Policy</h1>
            <div className="space-y-10" dangerouslySetInnerHTML={{__html: store.privacy_policy}}>
            </div>
        </div>
        </>
    )
}

export default PrivacyPage;
