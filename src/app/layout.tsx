import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppLayout from "@/components/AppLayout";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Velrocity",
  description: "Track habits, tasks, and progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
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
