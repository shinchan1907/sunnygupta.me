/* eslint-env jest */
import { act } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

test("renders the feature without crashing", () => {
  const div = document.createElement("div");
  document.body.appendChild(div);
  const root = createRoot(div);
  act(() => {
    root.render(<App />);
  });
  expect(div.querySelector("main")).not.toBeNull();
  act(() => {
    root.unmount();
  });
  document.body.removeChild(div);
});
