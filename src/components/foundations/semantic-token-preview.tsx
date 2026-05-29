const borderColor = "#e2e6ee";

type SwatchItem = {
  value: string;
  label: string;
  hint?: string;
  borderColor?: string;
  gradient?: string;
};

type SwatchSection = {
  title: string;
  items: SwatchItem[];
};

const neutralTextSection: SwatchSection = {
  title: "Neutral Text",
  items: [
    { value: "var(--semantic-text-ntrl-primary)", label: "primary", hint: "black" },
    { value: "var(--semantic-text-ntrl-primary-light)", label: "primary-light", hint: "800" },
    { value: "var(--semantic-text-ntrl-secondary)", label: "secondary", hint: "800" },
    { value: "var(--semantic-text-ntrl-secondary-light)", label: "secondary-light", hint: "600" },
    { value: "var(--semantic-text-ntrl-tertiary)", label: "tertiary", hint: "500" },
    { value: "var(--semantic-text-ntrl-tertiary-light)", label: "tertiary-light", hint: "400" },
    { value: "var(--semantic-text-ntrl-primary-inverse)", label: "primary-inverse", hint: "white" },
    { value: "var(--semantic-text-ntrl-primary-dark-inverse)", label: "primary-inverse-dark", hint: "100" },
    { value: "var(--semantic-text-ntrl-secondary-inverse)", label: "secondary-inverse", hint: "150" },
    { value: "var(--semantic-text-ntrl-secondary-dark-inverse)", label: "secondary-inverse-dark", hint: "150" },
    { value: "var(--semantic-text-ntrl-tertiary-inverse)", label: "tertiary-inverse", hint: "150" },
    { value: "var(--semantic-text-ntrl-tertiary-dark-inverse)", label: "tertiary-inverse-dark", hint: "150" },
    { value: "var(--semantic-text-ntrl-disabled)", label: "disabled", hint: "300" },
  ],
};

const brandTextSection: SwatchSection = {
  title: "Brand Text",
  items: [
    { value: "var(--semantic-text-brand-primary)", label: "primary", hint: "black" },
    { value: "var(--semantic-text-brand-primary-light)", label: "primary-light", hint: "800" },
    { value: "var(--semantic-text-brand-secondary)", label: "secondary", hint: "400" },
    { value: "var(--semantic-text-brand-secondary-light)", label: "secondary-light", hint: "400" },
    { value: "var(--semantic-text-brand-tertiary)", label: "tertiary", hint: "400" },
    { value: "var(--semantic-text-brand-tertiary-light)", label: "tertiary-light", hint: "400" },
    {
      value: "var(--semantic-text-brand-primary-inverse)",
      label: "primary-inverse",
      hint: "white",
      borderColor: "#f8f9fc",
    },
    { value: "var(--semantic-text-brand-primary-dark-inverse)", label: "primary-inverse-dark", hint: "100" },
    { value: "var(--semantic-text-brand-secondary-inverse)", label: "secondary-inverse", hint: "100" },
    { value: "var(--semantic-text-brand-secondary-dark-inverse)", label: "secondary-inverse-dark", hint: "100" },
    { value: "var(--semantic-text-brand-tertiary-inverse)", label: "tertiary-inverse", hint: "100" },
    { value: "var(--semantic-text-brand-tertiary-inverse-dark)", label: "tertiary-inverse-dark", hint: "100" },
    { value: "var(--semantic-text-brand-disabled)", label: "disabled", hint: "300" },
  ],
};

const neutralBgSection: SwatchSection = {
  title: "Neutral Bg",
  items: [
    { value: "var(--semantic-bg-ntrl-primary-inverse)", label: "primary-inverse" },
    { value: "var(--semantic-bg-ntrl-primary-inverse-hover)", label: "primary-inverse-hover", hint: "900" },
    { value: "var(--semantic-bg-ntrl-primary-inverse-active)", label: "primary-inverse-active", hint: "800" },
    { value: "var(--semantic-bg-ntrl-primary-inverse-pressed)", label: "primary-inverse-pressed", hint: "700" },
    { value: "var(--semantic-bg-ntrl-secondary-inverse)", label: "secondary-inverse", hint: "900" },
    { value: "var(--semantic-bg-ntrl-secondary-inverse-hover)", label: "secondary-inverse-hover", hint: "800" },
    { value: "var(--semantic-bg-ntrl-secondary-inverse-active)", label: "secondary-inverse-active", hint: "700" },
    { value: "var(--semantic-bg-ntrl-secondary-inverse-pressed)", label: "secondary-inverse-pressed", hint: "600" },
    { value: "var(--semantic-bg-ntrl-tertiary-inverse)", label: "tertiary-inverse", hint: "800" },
    { value: "var(--semantic-bg-ntrl-tertiary-inverse-hover)", label: "tertiary-inverse-hover", hint: "700" },
    { value: "var(--semantic-bg-ntrl-tertiary-inverse-active)", label: "tertiary-inverse-active", hint: "600" },
    { value: "var(--semantic-bg-ntrl-tertiary-inverse-pressed)", label: "tertiary-inverse-pressed", hint: "500" },
    { value: "var(--semantic-bg-ntrl-primary)", label: "primary" },
    { value: "var(--semantic-bg-ntrl-primary-hover)", label: "primary-hover", hint: "50" },
    { value: "var(--semantic-bg-ntrl-primary-active)", label: "primary-active", hint: "100" },
    { value: "var(--semantic-bg-ntrl-primary-pressed)", label: "primary-pressed", hint: "150" },
    { value: "var(--semantic-bg-ntrl-secondary)", label: "secondary" },
    { value: "var(--semantic-bg-ntrl-secondary-hover)", label: "secondary-hover", hint: "100" },
    { value: "var(--semantic-bg-ntrl-secondary-active)", label: "secondary-active", hint: "150" },
    { value: "var(--semantic-bg-ntrl-secondary-pressed)", label: "secondary-pressed", hint: "200" },
    { value: "var(--semantic-bg-ntrl-tertiary)", label: "tertiary" },
    { value: "var(--semantic-bg-ntrl-tertiary-hover)", label: "tertiary-hover", hint: "150" },
    { value: "var(--semantic-bg-ntrl-tertiary-active)", label: "tertiary-active", hint: "200" },
    { value: "var(--semantic-bg-ntrl-tertiary-pressed)", label: "tertiary-pressed", hint: "250" },
    { value: "var(--semantic-bg-ntrl-disabled)", label: "disabled", hint: "150" },
    { value: "var(--semantic-bg-ntrl-disabled-inverse)", label: "disabled-inverse", hint: "700" },
  ],
};

const brandBgSection: SwatchSection = {
  title: "Brand Bg",
  items: [
    { value: "var(--semantic-bg-brand-primary-inverse)", label: "primary-inverse" },
    { value: "var(--semantic-bg-brand-primary-inverse-hover)", label: "primary-inverse-hover", hint: "900" },
    { value: "var(--semantic-bg-brand-primary-inverse-active)", label: "primary-inverse-active", hint: "800" },
    { value: "var(--semantic-bg-brand-primary-inverse-pressed)", label: "primary-inverse-pressed", hint: "700" },
    { value: "var(--semantic-bg-brand-secondary-inverse)", label: "secondary-inverse" },
    { value: "var(--semantic-bg-brand-secondary-inverse-hover)", label: "secondary-inverse-hover", hint: "800" },
    { value: "var(--semantic-bg-brand-secondary-inverse-active)", label: "secondary-inverse-active", hint: "700" },
    { value: "var(--semantic-bg-brand-secondary-inverse-pressed)", label: "secondary-inverse-pressed", hint: "600" },
    { value: "var(--semantic-bg-brand-tertiary-inverse)", label: "tertiary-inverse" },
    { value: "var(--semantic-bg-brand-tertiary-inverse-hover)", label: "tertiary-inverse-hover", hint: "700" },
    { value: "var(--semantic-bg-brand-tertiary-inverse-active)", label: "tertiary-inverse-active", hint: "600" },
    { value: "var(--semantic-bg-brand-tertiary-inverse-pressed)", label: "tertiary-inverse-pressed", hint: "500" },
    { value: "var(--semantic-bg-brand-primary)", label: "primary" },
    { value: "var(--semantic-bg-brand-primary-hover)", label: "primary-hover", hint: "50" },
    { value: "var(--semantic-bg-brand-primary-active)", label: "primary-active", hint: "100" },
    { value: "var(--semantic-bg-brand-primary-pressed)", label: "primary-pressed", hint: "150" },
    { value: "var(--semantic-bg-brand-secondary)", label: "secondary" },
    { value: "var(--semantic-bg-brand-secondary-hover)", label: "secondary-hover", hint: "100" },
    { value: "var(--semantic-bg-brand-secondary-active)", label: "secondary-active", hint: "150" },
    { value: "var(--semantic-bg-brand-secondary-pressed)", label: "secondary-pressed", hint: "200" },
    { value: "var(--semantic-bg-brand-tertiary)", label: "tertiary" },
    { value: "var(--semantic-bg-brand-tertiary-hover)", label: "tertiary-hover", hint: "150" },
    { value: "var(--semantic-bg-brand-tertiary-active)", label: "tertiary-active", hint: "200" },
    { value: "var(--semantic-bg-brand-tertiary-pressed)", label: "tertiary-pressed", hint: "250" },
    { value: "var(--semantic-bg-brand-disabled)", label: "disabled", hint: "150" },
    { value: "var(--semantic-bg-brand-disabled-inverse)", label: "disabled-inverse", hint: "700" },
  ],
};

const neutralBorderSection: SwatchSection = {
  title: "Neutral Border",
  items: [
    { value: "var(--semantic-border-ntrl-delicate-inverse)", label: "delicate-inverse", hint: "800" },
    { value: "var(--semantic-border-ntrl-default-inverse)", label: "default-inverse", hint: "600" },
    { value: "var(--semantic-border-ntrl-default-inverse-hover)", label: "default-inverse-hover", hint: "500" },
    { value: "var(--semantic-border-ntrl-default-inverse-focused)", label: "default-inverse-focused", hint: "400" },
    { value: "var(--semantic-border-ntrl-delicate)", label: "delicate", hint: "200" },
    { value: "var(--semantic-border-ntrl-default)", label: "default", hint: "250" },
    { value: "var(--semantic-border-ntrl-default-hover)", label: "default-hover", hint: "300" },
    { value: "var(--semantic-border-ntrl-default-focused)", label: "default-focused", hint: "400" },
    { value: "var(--semantic-border-ntrl-disabled)", label: "disabled", hint: "300" },
  ],
};

const brandBorderSection: SwatchSection = {
  title: "Brand Border",
  items: [
    { value: "var(--semantic-border-brand-delicate-inverse)", label: "delicate-inverse", hint: "800" },
    { value: "var(--semantic-border-brand-default-inverse)", label: "default-inverse", hint: "700" },
    { value: "var(--semantic-border-brand-default-inverse-hover)", label: "default-inverse-hover", hint: "600" },
    { value: "var(--semantic-border-brand-default-inverse-focused)", label: "default-inverse-focused", hint: "500" },
    { value: "var(--semantic-border-brand-delicate)", label: "delicate", hint: "100" },
    { value: "var(--semantic-border-brand-default)", label: "default", hint: "150" },
    { value: "var(--semantic-border-brand-default-hover)", label: "default-hover", hint: "200" },
    { value: "var(--semantic-border-brand-default-focused)", label: "default-focused", hint: "250" },
    { value: "var(--semantic-border-brand-disabled)", label: "disabled", hint: "250" },
  ],
};

const statusSections: SwatchSection[] = [
  {
    title: "Success",
    items: [
      { value: "var(--semantic-status-success-dark)", label: "june.200" },
      { value: "var(--semantic-status-success-bright)", label: "june.150" },
      { value: "var(--semantic-status-success-default)", label: "june.100" },
      { value: "var(--semantic-status-success-pressed)", label: "june.35" },
      { value: "var(--semantic-status-success-active)", label: "june.25" },
      { value: "var(--semantic-status-success-hover)", label: "june.15" },
    ],
  },
  {
    title: "Warning",
    items: [
      { value: "var(--semantic-status-warning-dark)", label: "dark" },
      { value: "var(--semantic-status-warning-bright)", label: "bright" },
      { value: "var(--semantic-status-warning-default)", label: "default" },
      { value: "var(--semantic-status-warning-pressed)", label: "pressed" },
      { value: "var(--semantic-status-warning-active)", label: "active" },
      { value: "var(--semantic-status-warning-hover)", label: "hover" },
    ],
  },
  {
    title: "Error",
    items: [
      { value: "var(--semantic-status-error-dark)", label: "rose.200" },
      { value: "var(--semantic-status-error-bright)", label: "rose.150" },
      { value: "var(--semantic-status-error-default)", label: "rose.100" },
      { value: "var(--semantic-status-error-pressed)", label: "rose.35" },
      { value: "var(--semantic-status-error-active)", label: "rose.25" },
      { value: "var(--semantic-status-error-hover)", label: "rose.15" },
    ],
  },
  {
    title: "Info",
    items: [
      { value: "var(--semantic-status-info-dark)", label: "cyan.200" },
      { value: "var(--semantic-status-info-bright)", label: "cyan.150" },
      { value: "var(--semantic-status-info-default)", label: "cyan.100" },
      { value: "var(--semantic-status-info-pressed)", label: "cyan.35" },
      { value: "var(--semantic-status-info-active)", label: "cyan.25" },
      { value: "var(--semantic-status-info-hover)", label: "cyan.15" },
    ],
  },
];

const baseSection: SwatchSection = {
  title: "Base",
  items: [
    { value: "var(--semantic-status-base-default)", label: "default" },
    { value: "var(--semantic-status-base-bright)", label: "bright" },
    { value: "var(--semantic-status-base-default-inverse)", label: "default-inverse" },
    { value: "var(--semantic-status-base-bright-inverse)", label: "bright-inverse" },
    { value: "var(--semantic-status-base-overlay)", label: "overlay" },
    { value: "var(--semantic-status-base-overlay-inverse)", label: "overlay-inverse" },
  ],
};

const gradientSection: SwatchSection = {
  title: "Gradient",
  items: [
    { value: "", label: "default", gradient: "var(--gradient-brand-primary)" },
    {
      value: "",
      label: "bright",
      gradient: "var(--gradient-brand-primary-inverse)",
    },
  ],
};

function Swatch({ item }: { item: SwatchItem }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div
        className="h-[6.25rem] w-[12.5rem] rounded-[0.75rem] border"
        style={{
          background: item.gradient ? undefined : item.value,
          backgroundImage: item.gradient,
          borderColor: item.borderColor ?? borderColor,
        }}
      />
      <div className="w-[12.5rem] rounded-[0.75rem] p-2.5">
        <p className="text-base leading-none font-medium text-black">{item.label}</p>
        {item.hint ? <p className="mt-2.5 text-[0.6875rem] leading-none text-black">{item.hint}</p> : null}
      </div>
    </div>
  );
}

function Section({ section }: { section: SwatchSection }) {
  return (
    <div className="flex w-full flex-col items-start gap-2.5">
      <div className="flex flex-col items-start overflow-hidden p-2.5">
        <h2 className="text-[2rem] leading-none font-normal text-black">{section.title}</h2>
      </div>
      <div className="flex w-full flex-wrap items-center gap-2.5">
        {section.items.map((item) => (
          <Swatch key={`${section.title}-${item.label}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export function SemanticTokenPreview() {
  return (
    <section className="flex min-h-dvh w-full flex-col items-start gap-6 bg-white p-6">
      <div className="flex w-full flex-col items-start overflow-hidden p-2.5">
        <h1 className="text-[2.5rem] leading-none font-normal text-black">Semantic tokens</h1>
      </div>

      <Section section={neutralTextSection} />
      <Section section={brandTextSection} />
      <Section section={neutralBgSection} />
      <Section section={brandBgSection} />
      <Section section={neutralBorderSection} />
      <Section section={brandBorderSection} />

      <div className="flex w-full flex-col items-start gap-6">
        <div className="flex flex-col items-start overflow-hidden p-2.5">
          <h2 className="text-[2.5rem] leading-none font-normal text-black">Status</h2>
        </div>
        {statusSections.map((section) => (
          <Section key={section.title} section={section} />
        ))}
      </div>

      <Section section={baseSection} />
      <Section section={gradientSection} />
    </section>
  );
}
