import getStore from "@/actions/get-store";
import getSocials from "@/actions/get-socials";
import Link from "next/link";
import { MailIcon, PhoneIcon, PinIcon } from "lucide-react";
import { SocialIcon } from 'react-social-icons'

const Footer = async () => {
    const store = await getStore();
    const socials = await getSocials();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t">
            <div className="mx-auto p-10">
                <div className="flex flex-row justify-around">
                    <div className="flex flex-col gap-2 underline ">
                        <Link className="hover:opacity-50" href={"/ship"}> Shipping and Returns
                        </Link>
                        <Link className="hover:opacity-50" href={"/terms"}> Terms & Conditions
                        </Link>
                        <Link className="hover:opacity-50" href={"/privacy"}> Privacy policy
                        </Link>
                        <div className=" flex flex-row gap-3 mt-2">
                            {socials.map((social) => (
                                <SocialIcon key={social.id} className="cursor-pointer" url={social.url} network={social.name.toLowerCase()}/>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <div>
                            <Link className="underline hover:opacity-50" href={"/contact-us"}> Contact Us
                            </Link>
                        </div>
                        <div className="flex flex-1 gap-x-2">
                         <PhoneIcon size={20}/> <span><u>Phone number:</u> (+27)76 953 0163</span>
                        </div>
                        <div className="flex flex-1 gap-x-2">
                            <MailIcon size={20}/><span><u>Email:</u> sonet.browne@gmail.com</span>
                        </div>
                        <div className="flex flex-1 gap-x-2">
                           <PinIcon size={20}/> <span><u>Address:</u> Shop 11, Oudewerf, <br/>
                            Galloway St, Sybrand Van Niekerk Park, <br/>
                            Meyerton, 1960</span> 
                        </div>
                        
                    </div>
                    <div className="flex flex-col gap-y-2">
                        
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d223.02368226372147!2d28.00964925533577!3d-26.57221350718673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e94f9cd28fabac7%3A0xea37b1748fa9fc77!2sEco%20Health%20%26%20PrimeSelf%20%40%20Meyerton!5e0!3m2!1sen!2sza!4v1740224294545!5m2!1sen!2sza"
                     width="280" 
                     height="180" 
                     className="border-0" 
                    //  allowfullscreen="" 
                     loading="lazy" 
                    //  referrerpolicy="no-referrer-when-downgrade"
                    >
                    </iframe>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <span className="text-center bg-black text-white text-sm font-semibold px-3 py-1 rounded-full">EFT</span>
                </div>
                <div className="pt-3">
                    <p className="text-center text-sm text-black">
                        &copy; {currentYear} {store.name}, Inc. All rights reserved.
                    </p>

                </div>
            </div>
        </footer>
    )
}

export default Footer;