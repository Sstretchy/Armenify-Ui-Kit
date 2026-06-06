import type { Preview } from "@storybook/react-vite";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ["Foundations", "UI"],
      },
    },
  },
  tags: ["autodocs"],
};

export default preview;
