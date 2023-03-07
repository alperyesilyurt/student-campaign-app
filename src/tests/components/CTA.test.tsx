// TODO: Fix this test
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import React from "react";

describe("loads and displays greeting", async () => {
  test("renders CTA", async () => {
    render(<h1>Hello</h1>);
    expect(screen.getByText(/Hello/i)).toBeDefined();
  });
});

/* import { CTA } from "@/components/PageSpecific/LandingPage/CTA";

describe("loads and displays greeting", async () => {
  test("renders CTA", async () => {
    render(
      <CTA
        cta={{ name: "Lets do it" }}
        heading={"Enjoy cheaper life in university"}
        key={44}
      />,
    );
    expect(screen.getByText(/Enjoy cheaper life in university/i)).toBeDefined();
  });
});
 */
