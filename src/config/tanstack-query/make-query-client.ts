import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        /*
         * `staleTime` should be above 0 to avoid refetching immediately on the client
         */
        staleTime: 60 * 1000,
        /*
         * Do not retry in development.
         */
        retry: process.env.NODE_ENV === "production" ? 3 : false
      }
    }
  });
}
