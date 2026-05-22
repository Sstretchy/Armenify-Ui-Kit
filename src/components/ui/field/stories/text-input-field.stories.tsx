import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextInputField, type TextInputFieldVisualState } from "../text-input-field";
import type { TextInputColor, TextInputSize } from "../text-input";

const meta = {
  title: "UI/Field/TextInputField",
  component: TextInputField,
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
  args: {
    defaultValue: "There is no one who",
    "aria-label": "Demo",
  },
} satisfies Meta<typeof TextInputField>;

export default meta;

type Story = StoryObj<typeof meta>;

const sizes: TextInputSize[] = ["sm", "md", "lg"];
const colors: TextInputColor[] = ["ntrl", "brand"];
const staticStates: TextInputFieldVisualState[] = ["default", "hover", "focus", "error", "success", "disabled"];

export const Matrix: Story = {
  render: () => (
    <div className="flex max-w-lg flex-col gap-10 p-4">
      <p className="text-font-size-sm text-semantic-text-ntrl-secondary">
        Оболочка инпута по{" "}
        <a
          className="text-components-typography-brand-light-label underline"
          href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=182-1981"
          rel="noreferrer"
          target="_blank"
        >
          макету 182:1981
        </a>
        : размеры sm / md / lg, состояния рамки и фона, ntrl / brand.
      </p>
      {colors.map((color) => (
        <section key={color} className="flex flex-col gap-4">
          <h3 className="text-font-size-xs font-medium uppercase tracking-wide text-semantic-text-ntrl-secondary">
            {color}
          </h3>
          {sizes.map((size) => (
            <div key={`${color}-${size}`} className="flex flex-col gap-2">
              <p className="text-font-size-xs text-semantic-text-ntrl-tertiary">size: {size}</p>
              <div className="flex flex-col gap-2">
                {staticStates.map((visualState) => (
                  <TextInputField
                    key={visualState}
                    size={size}
                    color={color}
                    tone="default"
                    visualState={visualState}
                    disabled={visualState === "disabled"}
                    defaultValue="There is no one who"
                    aria-label={`${color} ${size} ${visualState}`}
                  />
                ))}
                <div>
                  <p className="mb-1 text-font-size-xxs text-semantic-text-ntrl-tertiary">interactive (hover / focus)</p>
                  <TextInputField
                    size={size}
                    color={color}
                    tone="default"
                    defaultValue="There is no one who"
                    aria-label={`${color} ${size} interactive`}
                  />
                </div>
                <div>
                  <p className="mb-1 text-font-size-xxs text-semantic-text-ntrl-tertiary">tone error (live)</p>
                  <TextInputField
                    size={size}
                    color={color}
                    tone="error"
                    defaultValue="There is no one who"
                    aria-label={`${color} ${size} error`}
                  />
                </div>
                <div>
                  <p className="mb-1 text-font-size-xxs text-semantic-text-ntrl-tertiary">tone success (live)</p>
                  <TextInputField
                    size={size}
                    color={color}
                    tone="success"
                    defaultValue="There is no one who"
                    aria-label={`${color} ${size} success`}
                  />
                </div>
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  ),
};
