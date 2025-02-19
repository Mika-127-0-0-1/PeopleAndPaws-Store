// import DOMPurify from 'dompurify';

import getStore from "@/actions/get-store";

export const revalidate =0;

const ShipPage = async () => {
    const store = await getStore();

    return (
        < >
        <div className="p-10">
            <h1 className="text-center text-3xl font-bold">Shipping and Returns</h1>
            <div className="space-y-10" dangerouslySetInnerHTML={{__html: store.shiping_returns}}>
            </div>
        </div>
        </>
    )
}

export default ShipPage;