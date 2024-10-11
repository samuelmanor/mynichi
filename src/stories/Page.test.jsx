import { render, screen } from "@testing-library/react";
import React from "react";

test("test", () => {
  render(<div>test</div>);
  const element = screen.getByText("test");
  expect(element).toBeDefined();
});
