import './globals.css';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url), // ✅ Fixes the green warnings
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'event planning',
    'wedding planner',
    'corporate events',
    'UK events',
    'luxury events',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`, // ✅ Replace with your S3 or logo URL
        width: 1200,
        height: 630,
        alt: 'HR Classic Events',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-image.jpg`], // ✅ Same image for Twitter preview
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Favicon / Touch Icon */}
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />

        {/* ✅ Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": siteConfig.name,
              "description": siteConfig.description,
              "url": siteConfig.url,
              "telephone": siteConfig.phone,
              "email": siteConfig.email,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bournemouth",
                "addressCountry": "UK",
              },
              "priceRange": "£££",
              "serviceArea": "UK",
            }),
          }}
        />
      </head>
      <body className="antialiased bg-ivory text-charcoal">{children}</body>
    </html>
  );
}
