import localFont from "next/font/local";

export const sansFont = localFont({
  src: "../../../public/fonts/Geist.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "300 800"
});

export const monoFont = localFont({
  src: "../../../public/fonts/GeistMono.woff2",
  variable: "--font-mono",
  display: "swap",
  weight: "300 900"
});
