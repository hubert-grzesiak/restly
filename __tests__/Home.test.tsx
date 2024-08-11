import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it(`should contain the text "found"`, () => {
    render(<Home />); // ARRANGE

    const myElem = screen.getByText(/found/i); // ACT

    expect(myElem).toBeInTheDocument(); // ASSERT
  });
});
