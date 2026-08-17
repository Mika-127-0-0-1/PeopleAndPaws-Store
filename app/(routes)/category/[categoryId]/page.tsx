import getCategory from "@/actions/get-category";
// import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import Filter from "./components/filter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-filters";
import type { Metadata } from "next";

interface CategoryProps {
    params: {
        categoryId: string;
    },
    searchParams: {
        // colorId: string;
        sizeId: string;
    }
}

export async function generateMetadata({ params }: CategoryProps): Promise<Metadata> {
    const category = await getCategory(params.categoryId);
    const description = `Shop ${category.name} products from Prime Self, NeuroActive and Pierre Ecohealth for natural wellness, personal training and holistic pet health.`;

    return {
        title: category.name,
        description,
        alternates: { canonical: `/category/${category.id}` },
        openGraph: {
            type: "website",
            url: `/category/${category.id}`,
            title: category.name,
            description,
            images: category.billboard?.imageUrl
                ? [{ url: category.billboard.imageUrl, alt: category.billboard.label }]
                : [],
        },
    };
}

const Category: React.FC<CategoryProps> =  async ({
    params,
    searchParams
}) => {
    const products = await  getProducts({
        categoryId: params.categoryId,
        // colorId: searchParams.colorId,
        sizeId: searchParams.sizeId,
    });

    const sizes = await getSizes();
    // const colors = await getColors();
    const category = await getCategory(params.categoryId);
    

    return (
        <div className="bg-white">
            <Container >
                <Billboard data={category.billboard}/>
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        {/* <MobileFilters sizes={sizes} colors={colors}/> */}
                        <MobileFilters sizes={sizes} />
                        <div className="hidden lg:block">
                            <Filter 
                            valueKey="sizeId"
                            name="Sizes"
                            data={sizes}/>
                            {/* <Filter 
                            valueKey="colorId"
                            name="Colors"
                            data={colors}/> */}
                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {products.length === 0 && <NoResults />}
                            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {products.map((item) => (
                                    <ProductCard 
                                    key={item.id}
                                    data={item}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Category;
