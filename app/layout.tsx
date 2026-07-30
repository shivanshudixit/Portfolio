import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Providers } from "@/components/providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://shivanshudixit.vercel.app'
      : 'http://localhost:3000'
  ),
  title: "Shivanshu Dixit | AI Engineer & Full Stack Developer",
  description: "Portfolio of Shivanshu Dixit — AI Engineer and Full Stack Developer building thoughtful, intelligent products.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shivanshu Dixit | AI Engineer & Full Stack Developer",
    description: "Building thoughtful, intelligent products with AI and modern web engineering.",
    type: "website",
    url: "/",
    images: [{ url: "/shivanshu-dixit.jpg", width: 1024, height: 1024, alt: "Shivanshu Dixit" }],
  },
  twitter: { card: "summary_large_image", title: "Shivanshu Dixit | AI Engineer & Full Stack Developer", images: ["/shivanshu-dixit.jpg"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#050505", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shivanshu Dixit",
    jobTitle: "AI Engineer and Full Stack Developer",
    ...(siteUrl ? { url: siteUrl } : {}),
    alumniOf: { "@type": "CollegeOrUniversity", name: "ABES Engineering College" },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        {process.env.NODE_ENV === 'production' && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
