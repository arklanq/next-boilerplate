import "server-only";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";
import { monoFont, sansFont } from "@/config/fonts/fonts";
import { RootProviders } from "./root-providers";

export type RootLayoutProps = Readonly<{ children: ReactNode }>;

export async function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sansFont.variable} ${monoFont.variable} antialiased`}>
        <ThemeProvider attribute="class" storageKey="color-theme" enableColorScheme={false}>
          <NuqsAdapter>
            <RootProviders>{children}</RootProviders>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
