import "./globals.css";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { RootLayout } from "@/components/layouts/root-layout/root-layout";

export const metadata: Metadata = {
  title: "YOU SHOULD CHANGE THIS",
  description: "YOU SHOULD CHANGE THIS"
};

export default function AppLayout(props: Readonly<PropsWithChildren>) {
  return <RootLayout>{props.children}</RootLayout>;
}
