/** @type { import('@storybook/react-vite').Preview } */
import "../src/index.css";
if (typeof window !== "undefined") {
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const applyTheme = (isDark) => {
    document.documentElement.classList.toggle("dark", isDark);
  };

  applyTheme(media.matches);

  media.addEventListener("change", (e) => {
    applyTheme(e.matches);
  });
}
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },
};

export default preview;