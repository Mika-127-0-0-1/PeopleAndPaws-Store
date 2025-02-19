// import DOMPurify from 'dompurify';

import getStore from "@/actions/get-store";

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