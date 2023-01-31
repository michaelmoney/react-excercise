import { render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should display title", () => {
    const { getByText } = render(<App />);
    expect(getByText(/React Excercise/)).toBeDefined();
  });
});
