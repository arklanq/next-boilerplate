"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { enableMapSet, setUseStrictShallowCopy } from "immer";
import type { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { getQueryClient } from "@/config/tanstack-query/get-query-client";
import { toastOptions } from "@/config/toasts/options";
import { RootShell } from "../../shells/root-shell/root-shell";

enableMapSet();
setUseStrictShallowCopy("class_only");

export function RootProviders(props: PropsWithChildren) {
  const { children } = props;
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster toastOptions={toastOptions} />
      <RootShell>{children}</RootShell>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
