import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import Home from "@/app/page";

describe("homepage", () => {
  it("shows only Hello world and a rotating React logo", () => {
    const { container } = render(<Home />);

    expect(screen.getByRole("heading", { name: "Hello world" })).toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveClass("logo");
    expect(container.querySelectorAll("main > *")).toHaveLength(2);
  });
});
