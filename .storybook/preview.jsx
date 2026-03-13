/** @type { import('@storybook/react-vite').Preview } */
import "../src/index.css";
import { DarkmodeProvider } from "../src/context/DarkmodeContext";

const preview = {
  decorators: [
    (Story) => (
      <DarkmodeProvider>
        <Story />
      </DarkmodeProvider>
    ),
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "todo",
    },
  },
};

export default preview;