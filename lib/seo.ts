export const siteName = "Therapeuo Store";

export const siteDescription =
  "Shop Prime Self, NeuroActive and Pierre Ecohealth natural wellness products for personal training, everyday wellbeing and pet health herbalist support in South Africa.";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://therapeuo.co.za"
);

export const seoKeywords = [
  "Prime Self", "PrimeSelf", "NeuroActive", "Pierre Ecohealth",
  "Pierre Eco Health", "natural wellness products",
  "personal training supplements", "pet health herbalist",
  "natural pet health", "Meyerton health shop",
  "South Africa wellness store",
];

export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();
