import getProducts from "@/actions/get-products";
import getProduct from "@/actions/get-product";
import Container from "@/components/ui/container";
import ProductList from "@/components/product-list";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import type { Metadata } from "next";
import { absoluteUrl, siteName } from "@/lib/seo";

interface ProductPageProps {
    params: {
        productId: string;
    }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const product = await getProduct(params.productId);
    const description = `Shop ${product.name} from ${product.category?.name ?? siteName}. Natural health and wellness products delivered in South Africa.`;

    return {
        title: product.name,
        description,
        alternates: { canonical: `/product/${product.id}` },
        openGraph: {
            type: "website",
            url: `/product/${product.id}`,
            title: product.name,
            description,
            images: product.images?.[0]?.url ? [{ url: product.images[0].url, alt: product.name }] : [],
        },
    };
}

const ProductPage: React.FC<ProductPageProps> = async ({
    params
}) => {
    const product = await getProduct(params.productId);
    const sugestedProducts = await getProducts({
        categoryId: product?.category?.id
    });
    const productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.images.map((image) => image.url),
        category: product.category?.name,
        url: absoluteUrl(`/product/${product.id}`),
        offers: {
            "@type": "Offer",
            priceCurrency: "ZAR",
            price: product.price,
            availability: "https://schema.org/InStock",
            url: absoluteUrl(`/product/${product.id}`),
        },
    };

    return (
        <div className="bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />
            <Container>
                <div className="px-4 py-10 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                        <Gallery images={product.images}/>
                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                            <Info data={product} />
                        </div>
                    </div>
                    <hr className="my-10"/>
                    <ProductList title="Related Items" items={sugestedProducts}/>
                </div>
            </Container>
        </div>
    )
};

export default ProductPage;
