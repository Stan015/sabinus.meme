import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import { AuthContextProvider } from "../context/auth-context";
import { ThemeProvider } from "next-themes";
import cn from "./utils/cn";
import Footer from "./components/footer";
import ClientProviders from "./components/client-providers";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sabinus Meme App",
  description:
    "A Sabinus meme library app. Memes are uploaded by fans to serve as store house to their favourite Sabinus memes.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-gradient-to-b from-clr-light-start-rgb to-clr-light-end-rgb dark:from-clr-dark-start-rgb dark:to-clr-dark-end-rgb",
          `${poppins.className}`,
        )}
      >
        <AuthContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableColorScheme
            enableSystem
          >
            <ClientProviders>
              <Header />
              {children}
              <Footer />
              <Analytics />
            </ClientProviders>
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
