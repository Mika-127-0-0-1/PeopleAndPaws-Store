import Container from "@/components/ui/container";
import Link from "next/link";
import MainNav from "@/components/main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "@/components/navbar-actions";
import Image from "next/image";

export const revalidate = 0;

const Navbar = async () => {
    const categories = await getCategories();

    return (
        <div className=" border-b">
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-20 items-center">
                    <Link href="/" className=" ml-4 flex lg:ml-0">
                        {/* <p className="font-bold text-xl">
                            {store.name}
                        </p> */}
                        <Image
                            src={"/Bussiness card_Named_Logo.png"}
                            alt="Therapeuo Store natural health and wellness"
                            width={200}
                            height={200}
                            className="h-20 w-auto"
                        />
                    </Link>
                    <MainNav data={categories}/>
                    <NavbarActions />
                </div>
            </Container>
        </div>
    )
}

export default Navbar;
