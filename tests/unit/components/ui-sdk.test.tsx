import { act, fireEvent, render, screen } from "@testing-library/react";
import { Field, FieldLabel } from "@ui-sdk/react/field";
import { Switch, SwitchThumb } from "@ui-sdk/react/switch";
import { describe, expect, it } from "bun:test";

describe("ui-sdk", () => {
  it("renders a labelled switch that toggles", async () => {
    render(
      <Field>
        <Switch name="digest">
          <SwitchThumb />
        </Switch>
        <FieldLabel>Weekly digest</FieldLabel>
      </Field>
    );

    const toggle = screen.getByRole("switch", { name: "Weekly digest" });
    expect(toggle).toHaveAttribute("aria-checked", "false");

    await act(async () => fireEvent.click(toggle));
    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(toggle).toHaveAttribute("data-checked");
  });
});
