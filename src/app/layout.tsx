import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import { AuthContextProvider } from "../context/auth-context";

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
    <html lang="en">
      <body className={poppins.className}>
        <AuthContextProvider>
          <Header />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
