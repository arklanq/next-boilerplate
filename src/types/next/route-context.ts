export interface RouteContext {
  params: Promise<Record<string, string | string[]>>;
}
