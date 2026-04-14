import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppLayout from "@/components/AppLayout";
import { Providers } from "@/components/Providers";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Velrocity - Elite Habit Tracker",
  description: "Track your habits with a premium, immersive experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans bg-zinc-50 dark:bg-zinc-950`}>
        <ThemeProvider>
          <Providers>
            <AppLayout>
              {children}
            </AppLayout>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
