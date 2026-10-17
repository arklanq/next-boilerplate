// The app's public origin from `APP_BASE_URL`. A fixed value, unlike request headers, can't be spoofed.
export function appBaseUrl(): string {
  const url = new URL(process.env.APP_BASE_URL ?? "http://localhost:3000");
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) {
    throw new Error("Invalid APP_BASE_URL.");
  }
  if (url.protocol === "http:" && !["127.0.0.1", "localhost"].includes(url.hostname)) {
    throw new Error("HTTPS is required outside localhost.");
  }
  return url.origin;
}
