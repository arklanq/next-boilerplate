import { getDisplayName } from "next/dist/shared/lib/utils";
import type { ComponentType } from "react";

export function withDefaultProps<P extends object>(
  WrappedComponent: ComponentType<P>,
  defaultProps: Partial<P>
): ComponentType<P> {
  const newComponent: ComponentType<P> = (props: P) => <WrappedComponent {...defaultProps} {...props} />;

  newComponent.displayName = `withDefaultProps(${getDisplayName(WrappedComponent)})`;

  return newComponent;
}
