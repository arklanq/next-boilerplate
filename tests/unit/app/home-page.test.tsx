import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";
import Home from "@/app/page";

describe("homepage", () => {
  afterEach(cleanup);

  it("shows only Hello world and a rotating React logo", () => {
    const { container } = render(<Home />);

    expect(screen.getByRole("heading", { name: "Hello world" })).toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveClass("motion-safe:animate-spin");
    expect(container.querySelectorAll("main > *")).toHaveLength(2);
  });
});
