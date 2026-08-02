import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shaiks Real Estate | Premium Properties & Investments",
  description:
    "Discover luxury properties, villas, apartments, and investment opportunities with Shaiks Real Estate. Trusted real estate experts with 10+ years experience.",
  generator: "v0.app",
  keywords:
    "real estate, properties, villas, apartments, plots, investment, India",
  openGraph: {
    title: "Shaiks Real Estate | Premium Properties",
    description:
      "Find your dream property with confidence. Premium villas, apartments, and investment opportunities.",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "favicon.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "favicon.svg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "favicon.svg",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8b7355" },
    { media: "(prefers-color-scheme: dark)", color: "#c9a876" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
