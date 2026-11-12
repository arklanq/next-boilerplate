import type { PropsWithChildren } from "react";
import styles from "./root-shell.module.css";

type RootShellProps = PropsWithChildren;

function RootShell(props: RootShellProps) {
  const { children } = props;

  return <div className={styles.shell}>{children}</div>;
}

export { RootShell, type RootShellProps };
