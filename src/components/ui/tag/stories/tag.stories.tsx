import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tag } from "../tag";

const meta = {
  title: "UI/Tag",
  component: Tag,
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

const colors = ["brand", "brand-inverse", "gradient"] as const;
const sizes = ["sm", "lg"] as const;

export const Matrix: Story = {
  args: { children: "tag text" },
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      <p className="text-font-size-sm text-semantic-text-ntrl-secondary">
        Tag matrix from Figma node{" "}
        <a
          className="text-components-typography-brand-light-label underline"
          href="https://www.figma.com/design/btCKgn6RrWiteyBN0bViU1/Armenify?node-id=182-435"
          rel="noreferrer"
          target="_blank"
        >
          182:435
        </a>
        : sm / lg, brand / brand-inverse / gradient, bordered and removable variants.
      </p>
      {sizes.map((size) => (
        <section key={size} className="flex flex-col gap-3">
          <p className="text-font-size-xs font-medium text-semantic-text-ntrl-secondary">size: {size}</p>
          <div className="flex flex-col gap-3">
            {colors.map((color) => (
              <div key={color} className="flex flex-wrap items-center gap-3">
                <span className="w-28 text-font-size-xs text-semantic-text-ntrl-tertiary">{color}</span>
                <Tag size={size} color={color}>
                  tag text
                </Tag>
                <Tag size={size} color={color} bordered>
                  tag text
                </Tag>
                <Tag size={size} color={color} showRemove onRemove={() => undefined}>
                  tag text
                </Tag>
                <Tag size={size} color={color} bordered showRemove onRemove={() => undefined}>
                  tag text
                </Tag>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

export const States: Story = {
  args: { children: "tag text" },
  render: function States() {
    const [tags, setTags] = React.useState(["React", "TypeScript", "Figma"]);

    return (
      <div className="flex flex-col gap-6 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <Tag size="sm">default</Tag>
          <Tag size="sm" bordered>
            bordered
          </Tag>
          <Tag size="sm" showRemove onRemove={() => undefined}>
            removable
          </Tag>
          <Tag size="sm" disabled showRemove onRemove={() => undefined}>
            disabled
          </Tag>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {tags.map((tag) => (
            <Tag key={tag} size="sm" color="brand" showRemove onRemove={() => setTags((current) => current.filter((item) => item !== tag))}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    );
  },
};
