import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://adwiz-media.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Adwiz Media | Social Media Management and Digital Growth Agency",
    template: "%s | Adwiz Media"
  },
  description:
    "Adwiz Media helps brands grow with social media management, online presence setup, reach campaigns, content strategy, and lead-focused digital marketing.",
  keywords: [
    "Adwiz Media",
    "social media management",
    "digital marketing agency",
    "online presence",
    "content strategy",
    "reach campaigns",
    "lead generation"
  ],
  openGraph: {
    title: "Adwiz Media | Build Reach, Presence, and Growth",
    description:
      "A digital growth agency for brands that need social media management, better online presence, campaign strategy, and consistent content execution.",
    url: siteUrl,
    siteName: "Adwiz Media",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
