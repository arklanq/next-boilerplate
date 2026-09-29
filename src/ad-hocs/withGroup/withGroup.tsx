import { getDisplayName } from "next/dist/shared/lib/utils";
import type { ComponentType } from "react";

export function withGroup<P extends object, S extends object>(
  WrappedComponent: ComponentType<P>,
  components: S
): ComponentType<P> & S {
  const newComponent: ComponentType<P> = (props: P) => <WrappedComponent {...props} />;

  return Object.assign(newComponent, {
    ...components,
    displayName: `withGroup(${getDisplayName(WrappedComponent)})`
  });
}
