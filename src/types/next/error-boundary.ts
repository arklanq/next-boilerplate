export interface ErrorBoundaryFallbackProps {
  /**
   * `unknown` for `react-error-boundary`
   * `Error & { digest?: string; componentStack?: string; }` for next.js integrated error boundary (error.tsx)
   */
  error: unknown;
  reset: () => void;
}
