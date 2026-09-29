export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6">
      <svg
        className="size-32 text-[#61dafb] motion-safe:animate-spin"
        style={{ animationDuration: "5s" }}
        viewBox="-12 -11 24 22"
        aria-hidden="true"
      >
        <ellipse rx="11" ry="4.2" fill="none" stroke="currentColor" strokeWidth="0.9" />
        <ellipse rx="11" ry="4.2" fill="none" stroke="currentColor" strokeWidth="0.9" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" fill="none" stroke="currentColor" strokeWidth="0.9" transform="rotate(120)" />
        <circle r="2.1" fill="currentColor" />
      </svg>
      <h1 className="text-3xl">Hello world</h1>
    </main>
  );
}
