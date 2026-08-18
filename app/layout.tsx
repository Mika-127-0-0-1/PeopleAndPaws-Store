import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModalProvider from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import { ClerkProvider } from '@clerk/nextjs'
import { seoKeywords, siteDescription, siteName, siteUrl } from "@/lib/seo";
import getStore from "@/actions/get-store";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${siteName} | Natural Health & Wellness`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: seoKeywords,
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "/",
    siteName,
    title: `${siteName} | Natural Health & Wellness`,
    description: siteDescription,
    images: [{
      url: "/Bussiness card_Named_Logo.png",
      width: 1200,
      height: 630,
      alt: `${siteName} logo`,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Natural Health & Wellness`,
    description: siteDescription,
    images: ["/Bussiness card_Named_Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const store = await getStore();
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Store", "HealthAndBeautyBusiness"],
    name: siteName,
    url: siteUrl.toString(),
    image: new URL("/Bussiness card_Named_Logo.png", siteUrl).toString(),
    telephone: "+27 76 953 0163",
    email: "sonet.browne@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shop 11, Oudewerf, Galloway Street, Sybrand Van Niekerk Park",
      addressLocality: "Meyerton",
      postalCode: "1960",
      addressCountry: "ZA",
    },
    areaServed: "South Africa",
    brand: ["Prime Self", "NeuroActive", "Pierre Ecohealth"],
  };

  return (
    <ClerkProvider>
      <html lang="en-ZA">
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          />
        </head>
        <body className={font.className}>
          {store.isMaintenance ? (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16 text-center">
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {store.name}
                </p>
                <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                  We&rsquo;ll be back soon
                </h1>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  Our store is currently undergoing maintenance. Thank you for your patience while we make things better.
                </p>
              </div>
            </main>
          ) : (
            <>
              <ModalProvider />
              <ToasterProvider />
              <Navbar />
              {children}
              <Footer />
            </>
          )}
        </body>
      </html>
    </ClerkProvider>
  );
}
