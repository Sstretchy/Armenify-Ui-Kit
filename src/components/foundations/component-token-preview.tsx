const borderColor = "#e2e6ee";

type TokenCard = {
  label: string;
  value?: string;
  gradient?: string;
  borderColor?: string;
};

type TokenSection = {
  title: string;
  cards: TokenCard[];
};

const typographySections: TokenSection[] = [
  {
    title: "Neutral Typography Light",
    cards: [
      { label: "black", value: "var(--components-typography-ntrl-light-content)" },
      { label: "neutral.900", value: "var(--components-typography-ntrl-light-content-light)" },
      { label: "neutral.800", value: "var(--components-typography-ntrl-light-inp-text)" },
      { label: "neutral.700", value: "var(--components-typography-ntrl-light-label)" },
      { label: "neutral.600", value: "var(--components-typography-ntrl-light-sub-label)" },
      { label: "neutral.500", value: "var(--components-typography-ntrl-light-placeholder)" },
    ],
  },
  {
    title: "Neutral Typography Dark",
    cards: [
      { label: "black", value: "var(--components-typography-ntrl-dark-content)" },
      { label: "neutral.900", value: "var(--components-typography-ntrl-dark-content-light)" },
      { label: "neutral.800", value: "var(--components-typography-ntrl-dark-inp-text)" },
      { label: "neutral.700", value: "var(--components-typography-ntrl-dark-label)" },
      { label: "neutral.600", value: "var(--components-typography-ntrl-dark-sub-label)" },
      { label: "neutral.500", value: "var(--components-typography-ntrl-dark-placeholder)" },
    ],
  },
  {
    title: "Brand Typography Light",
    cards: [
      { label: "black", value: "var(--components-typography-brand-light-content)" },
      { label: "neutral.900", value: "var(--components-typography-brand-light-content-light)" },
      { label: "neutral.800", value: "var(--components-typography-brand-light-inp-text)" },
      { label: "neutral.700", value: "var(--components-typography-brand-light-label)" },
      { label: "neutral.600", value: "var(--components-typography-brand-light-sub-label)" },
      { label: "neutral.500", value: "var(--components-typography-brand-light-placeholder)" },
    ],
  },
  {
    title: "Brand Typography Dark",
    cards: [
      { label: "black", value: "var(--components-typography-brand-dark-content)" },
      { label: "neutral.900", value: "var(--components-typography-brand-dark-content-light)" },
      { label: "neutral.800", value: "var(--components-typography-brand-dark-inp-text)" },
      { label: "neutral.700", value: "var(--components-typography-brand-dark-label)" },
      { label: "neutral.600", value: "var(--components-typography-brand-dark-sub-label)" },
      { label: "neutral.500", value: "var(--components-typography-brand-dark-placeholder)" },
    ],
  },
];

const tagsSection: TokenSection = {
  title: "Tags",
  cards: [
    { label: "default-text", value: "var(--components-tags-text-default)" },
    { label: "default-light-text", value: "var(--components-tags-text-default-light)", borderColor: "#f8f9fc" },
    { label: "default-bg", value: "var(--components-tags-bg-default)" },
    { label: "default-light-bg", value: "var(--components-tags-bg-default-light)" },
  ],
};

const controlSections: TokenSection[] = [
  {
    title: "Text",
    cards: [
      { label: "brand.1000", value: "var(--components-controls-text-primary)" },
      { label: "brand.900", value: "var(--components-controls-text-secondary)" },
      { label: "brand.800", value: "var(--components-controls-text-tertiary)" },
      { label: "brand.700", value: "var(--components-controls-text-outlined)" },
      { label: "brand.600", value: "var(--components-controls-text-disabled)" },
    ],
  },
  {
    title: "Primary Ghost Text",
    cards: [
      { label: "brand.1000", value: "var(--components-controls-text-ghost-primary-default)" },
      { label: "brand.900", value: "var(--components-controls-text-ghost-primary-hover)" },
      { label: "brand.800", value: "var(--components-controls-text-ghost-primary-active)" },
      { label: "brand.700", value: "var(--components-controls-text-ghost-primary-disabled)" },
    ],
  },
  {
    title: "Secondary Ghost Text",
    cards: [
      { label: "brand.1000", value: "var(--components-controls-text-ghost-secondary-default)" },
      { label: "brand.900", value: "var(--components-controls-text-ghost-secondary-hover)" },
      { label: "brand.800", value: "var(--components-controls-text-ghost-secondary-active)" },
      { label: "brand.700", value: "var(--components-controls-text-ghost-secondary-disabled)" },
    ],
  },
  {
    title: "Tertiary Ghost Text",
    cards: [
      { label: "brand.1000", value: "var(--components-controls-text-ghost-tertiary-default)" },
      { label: "brand.900", value: "var(--components-controls-text-ghost-tertiary-hover)" },
      { label: "brand.800", value: "var(--components-controls-text-ghost-tertiary-active)" },
      { label: "brand.700", value: "var(--components-controls-text-ghost-tertiary-disabled)" },
    ],
  },
  {
    title: "Bg",
    cards: [
      { label: "brand.1000", value: "var(--components-controls-bg-primary)" },
      { label: "brand.900", value: "var(--components-controls-bg-tertiary)" },
      { label: "brand.800", value: "var(--components-controls-bg-outlined)" },
      { label: "brand.700", value: "var(--components-controls-bg-disabled)" },
    ],
  },
  {
    title: "Secondary Bg",
    cards: [
      { label: "brand.1000", value: "var(--components-controls-bg-secondary-default)" },
      { label: "brand.900", value: "var(--components-controls-bg-secondary-hover)" },
      { label: "brand.800", value: "var(--components-controls-bg-secondary-active)" },
      { label: "brand.700", value: "var(--components-controls-bg-secondary-pressed)" },
    ],
  },
  {
    title: "Primary Ghost Bg",
    cards: [{ label: "brand.1000", value: "var(--components-controls-bg-ghost-primary-pressed)" }],
  },
  {
    title: "Secondary Ghost Bg",
    cards: [{ label: "brand.1000", value: "var(--components-controls-bg-ghost-secondary-pressed)" }],
  },
  {
    title: "Tertiary Ghost Bg",
    cards: [{ label: "brand.1000", value: "var(--components-controls-bg-ghost-tertiary-pressed)" }],
  },
  {
    title: "Border",
    cards: [
      { label: "brand.1000", value: "var(--components-controls-border-primary)" },
      { label: "brand.900", value: "var(--components-controls-border-secondary)" },
      { label: "brand.800", value: "var(--components-controls-border-outlined)" },
      { label: "brand.700", value: "var(--components-controls-border-disabled)" },
    ],
  },
  {
    title: "Shadow",
    cards: [
      { label: "brand.1000", value: "var(--components-controls-shadows-default)" },
      { label: "brand.900", value: "var(--components-controls-shadows-default-inner)" },
      { label: "brand.800", value: "var(--components-controls-shadows-hover)" },
      { label: "brand.700", value: "var(--components-controls-shadows-active)" },
      { label: "brand.700", value: "var(--components-controls-shadows-pressed)" },
    ],
  },
];

const cardSection: TokenSection = {
  title: "Gradient",
  cards: [
    { label: "brand.1000", gradient: "var(--gradient-card-rainbow1)" },
    { label: "brand.900", gradient: "var(--gradient-card-rainbow2)" },
    { label: "brand.800", gradient: "var(--gradient-card-rainbow3)" },
  ],
};

function TokenCardView({ card }: { card: TokenCard }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div
        className="h-[6.25rem] w-[12.5rem] rounded-[0.75rem] border"
        style={{
          background: card.gradient ? undefined : card.value,
          backgroundImage: card.gradient,
          borderColor: card.borderColor ?? borderColor,
        }}
      />
      <div className="w-[12.5rem] rounded-[0.75rem] p-2.5">
        <p className="text-base leading-none font-medium text-black">{card.label}</p>
      </div>
    </div>
  );
}

function TokenSectionView({ section }: { section: TokenSection }) {
  return (
    <div className="flex w-full flex-col items-start gap-2.5">
      <div className="flex flex-col items-start overflow-hidden p-2.5">
        <h2 className="text-[2rem] leading-none font-normal text-black">{section.title}</h2>
      </div>
      <div className="flex w-full flex-wrap items-center gap-2.5">
        {section.cards.map((card, index) => (
          <TokenCardView key={`${section.title}-${card.label}-${index}`} card={card} />
        ))}
      </div>
    </div>
  );
}

export function ComponentTokenPreview() {
  return (
    <section className="flex min-h-dvh w-full flex-col items-start gap-6 bg-white p-6">
      <div className="flex flex-col items-start overflow-hidden p-2.5">
        <h1 className="text-[2.5rem] leading-none font-normal text-black">Component tokens</h1>
      </div>

      {typographySections.map((section) => (
        <TokenSectionView key={section.title} section={section} />
      ))}

      <TokenSectionView section={tagsSection} />

      <div className="flex w-full flex-col items-start gap-2.5 rounded-[1.25rem] bg-[#f8f9fd] p-5">
        <div className="flex flex-col items-start overflow-hidden p-2.5">
          <h2 className="text-[2.5rem] leading-none font-normal text-black">Controls</h2>
        </div>
        {controlSections.map((section) => (
          <TokenSectionView key={section.title} section={section} />
        ))}
      </div>

      <div className="flex flex-col items-start overflow-hidden p-2.5">
        <h1 className="text-[2.5rem] leading-none font-normal text-black">Card</h1>
      </div>

      <div className="flex w-full max-w-[95.625rem] flex-col items-start gap-2.5">
        <div className="flex flex-col items-start overflow-hidden p-2.5">
          <h2 className="text-[2rem] leading-none font-normal text-black">Gradient</h2>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2.5 rounded-[1.25rem] bg-[#6b6b6b] p-5">
          {cardSection.cards.map((card, index) => (
            <TokenCardView key={`Card-${card.label}-${index}`} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
