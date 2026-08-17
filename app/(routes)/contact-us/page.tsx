import ContactForm from "./components/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Contact Therapeuo Store in Meyerton for help with Prime Self, NeuroActive, Pierre Ecohealth and natural wellness products.",
    alternates: { canonical: "/contact-us" },
};

const ContactPage = () => {

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ContactForm />
            </div>
        </div>
    )
}

export default ContactPage;
