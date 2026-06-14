import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../button";
import { TextInputField } from "../../field/text-input-field";
import { Typography } from "../../typography";
import { GlassCardRoot, type GlassCardSize } from "../glass-card";

const meta = {
  title: "UI/GlassCard",
  component: GlassCardRoot,
  tags: ["!autodocs"],
  parameters: {
    layout: "centered",
    controls: { disable: true },
  },
} satisfies Meta<typeof GlassCardRoot>;

export default meta;

type Story = StoryObj<typeof meta>;

const specimenSizes: GlassCardSize[] = ["lg", "md", "sm"];

const toggleGradientAngleBySize: Record<GlassCardSize, string> = {
  lg: "62.8765565618deg",
  md: "64.9393361842deg",
  sm: "68.6330267879deg",
};

const submitGradientAngleBySize: Record<GlassCardSize, string> = {
  lg: "44.3070865031deg",
  md: "46.9179923496deg",
  sm: "51.9581767604deg",
};

const controlShadowClassName =
  "!shadow-[0_0.0625rem_0.0625rem_0_var(--components-controls-shadows-default)]";
const inputFieldShadowClassName =
  "[box-shadow:inset_0_0_0_0.09375rem_var(--input-border-color),var(--input-outer-shadow)]";

function gradientStyle(angle: string, variableName: string): CSSProperties {
  return {
    [variableName]: angle,
  } as CSSProperties;
}

function AuthModeToggle({ size }: { size: GlassCardSize }) {
  return (
    <div
      className="flex w-full overflow-hidden rounded-border-lg shadow-[0_0.0625rem_0.125rem_0_var(--components-controls-shadows-default)] inner-border [--inner-border-width:0.09375rem] [--inner-border-color:var(--semantic-border-brand-default)]"
    >
      <Button
        variant="primary"
        size="md"
        zeroCorner
        tabIndex={-1}
        className={`min-w-0 flex-1 !rounded-none ${controlShadowClassName} [background-image:linear-gradient(var(--glass-card-toggle-angle),var(--primitive-colors-brand-150)_0%,var(--primitive-colors-brand-400)_50%,var(--primitive-colors-brand-600)_100%)]`}
        style={gradientStyle(toggleGradientAngleBySize[size], "--glass-card-toggle-angle")}
      >
        Вход
      </Button>
      <Button
        variant="tertiary"
        size="md"
        zeroCorner
        tabIndex={-1}
        className={`min-w-0 flex-1 !rounded-none !opacity-50 ${controlShadowClassName}`}
      >
        Регистрация
      </Button>
    </div>
  );
}

function AuthField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div className="flex w-full flex-col gap-1">
      <Typography
        as="p"
        variant="base"
        weight="medium"
        className="text-components-typography-brand-dark-content"
      >
        {label}
      </Typography>
      <TextInputField
        size="lg"
        color="brand"
        placeholder={placeholder}
        readOnly
        tabIndex={-1}
        fieldClassName={inputFieldShadowClassName}
        className="w-full [&_input]:placeholder:opacity-100"
        aria-label={label}
      />
      <div className="h-5" aria-hidden />
    </div>
  );
}

function SubmitButton({ size }: { size: GlassCardSize }) {
  return (
    <Button
      variant="primary"
      size="md"
      tabIndex={-1}
      className={`w-full ${controlShadowClassName} [background-image:linear-gradient(var(--glass-card-submit-angle),var(--primitive-colors-brand-150)_0%,var(--primitive-colors-brand-400)_50%,var(--primitive-colors-brand-600)_100%)]`}
      style={gradientStyle(submitGradientAngleBySize[size], "--glass-card-submit-angle")}
    >
      Войти
    </Button>
  );
}

function AuthCardSlot({ size }: { size: GlassCardSize }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-col items-center gap-7">
        <Typography
          as="h2"
          variant="xl"
          weight="medium"
          align="center"
          className="w-full text-components-typography-brand-dark-content"
        >
          Добро пожаловать!
        </Typography>
        <AuthModeToggle size={size} />
        <div className="h-[0.0625rem] w-full bg-semantic-border-brand-delicate" aria-hidden />
        <div className="flex w-full flex-col">
          <AuthField label="E-mail" placeholder="example@gmail.com" />
          <AuthField label="Пароль" placeholder="********" />
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-[0.875rem]">
        <SubmitButton size={size} />
        <Typography
          as="p"
          variant="sm"
          weight="medium"
          align="center"
          className="w-full text-components-typography-brand-dark-content-light"
        >
          Забыли пароль?
        </Typography>
      </div>
    </div>
  );
}

function FigmaSpecimenFrame() {
  return (
    <div className="relative box-border flex w-[33.75rem] flex-col items-start gap-5 bg-[#333333] p-5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[0.3125rem] before:border-[0.0625rem] before:border-dashed before:border-[#9747FF] before:content-['']">
      {specimenSizes.map((size) => (
        <GlassCardRoot key={size} size={size}>
          <AuthCardSlot size={size} />
        </GlassCardRoot>
      ))}
    </div>
  );
}

export const FigmaSpecimen: Story = {
  render: () => <FigmaSpecimenFrame />,
};
