import type { Meta, StoryObj } from "@storybook/react-vite";

import { Alert, type AlertState, type AlertTheme } from "../alert";

const meta = {
  title: "Molecules/Alert",
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const demo = "Something went wrong, please reload the page...";

export const Default: Story = {
  render: () => (
    <div className="max-w-md">
      <Alert.Banner state="error" theme="dark" onClose={() => undefined}>
        {demo}
      </Alert.Banner>
    </div>
  ),
};

export const Matrix: Story = {
  render: () => {
    const states: AlertState[] = ["error", "success", "warning", "info"];
    const themes: AlertTheme[] = ["dark", "light"];
    return (
      <div className="flex max-w-xl flex-col gap-10 p-4">
        <p className="text-font-size-sm text-semantic-text-ntrl-secondary">
          Макет:{" "}
          <a
            className="text-components-typography-brand-light-label underline"
            href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=120-4285"
            rel="noreferrer"
            target="_blank"
          >
            120:4285
          </a>
          . Inline-баннер: <code className="font-mono text-font-size-xxs-input">role=&quot;alert&quot;</code> для{" "}
          <code className="font-mono text-font-size-xxs-input">error</code>, иначе{" "}
          <code className="font-mono text-font-size-xxs-input">status</code> (см.{" "}
          <a className="underline" href="https://www.radix-ui.com/primitives/docs/components/alert-dialog" rel="noreferrer" target="_blank">
            Radix Alert Dialog
          </a>{" "}
          — только для модалок подтверждения, не для этого UI).
        </p>
        {themes.map((theme) => (
          <div key={theme} className="flex flex-col gap-3">
            <span className="text-font-size-xxs-input font-medium capitalize text-semantic-text-ntrl-primary">{theme}</span>
            <div
              className={
                theme === "light"
                  ? "flex flex-col gap-3 rounded-border-md bg-semantic-bg-ntrl-secondary-inverse p-4"
                  : "flex flex-col gap-3 rounded-border-md bg-semantic-bg-brand-secondary p-4"
              }
            >
              {states.map((state) => (
                <Alert.Banner key={`${theme}-${state}`} state={state} theme={theme} onClose={() => undefined}>
                  {demo}
                </Alert.Banner>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
