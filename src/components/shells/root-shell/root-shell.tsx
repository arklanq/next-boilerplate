import type { PropsWithChildren } from "react";

type RootShellProps = PropsWithChildren;

function RootShell(props: RootShellProps) {
  const { children } = props;

  return <div className="flex min-h-screen w-full flex-col">{children}</div>;
}

export { RootShell, type RootShellProps };
