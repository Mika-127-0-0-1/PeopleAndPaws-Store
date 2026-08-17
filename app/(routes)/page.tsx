import getBillboard from "@/actions/get-billboards";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import type { Metadata } from "next";
import { seoKeywords, siteDescription } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Prime Self, NeuroActive & Pierre Ecohealth",
    description: siteDescription,
    keywords: seoKeywords,
    alternates: { canonical: "/" },
};

export const revalidate =0;

const HomePage = async () => {
    const products = await getProducts({ isFeatured: true });
    const billboard = await getBillboard("e472f4b7-3018-43e7-a5b6-2e014cb0bfa2");

    return (
        <Container>
            <div className="space-y-10 pb-10">
                <Billboard data={billboard}/>
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                    <section className="mx-auto max-w-3xl text-center" aria-labelledby="wellness-heading">
                        <h1 id="wellness-heading" className="text-3xl font-bold text-gray-900">
                            Natural health and wellness products
                        </h1>
                        <p className="mt-3 text-gray-600">
                            Explore Prime Self, NeuroActive and Pierre Ecohealth products selected for
                            everyday natural wellbeing, personal training support and holistic pet health.
                        </p>
                    </section>
                    <ProductList title="Featured Products" items={products}/>
                </div>
            </div>
        </Container>
    )
}

export default HomePage;
