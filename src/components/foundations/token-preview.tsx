const borderColor = "#e2e6ee";

type TokenSection = {
  title: string;
  family: "neutral" | "brand" | "june" | "amber" | "rose" | "cyan";
  items: Array<{
    token: string;
    label: string;
  }>;
};

const sections: TokenSection[] = [
  {
    title: "Neutral",
    family: "neutral",
    items: [
      { token: "black", label: "black" },
      { token: "900", label: "neutral.900" },
      { token: "800", label: "neutral.800" },
      { token: "700", label: "neutral.700" },
      { token: "600", label: "neutral.600" },
      { token: "500", label: "neutral.500" },
      { token: "400", label: "neutral.400" },
      { token: "white", label: "White" },
      { token: "50", label: "neutral.50" },
      { token: "100", label: "neutral.100" },
      { token: "150", label: "neutral.150" },
      { token: "200", label: "neutral.200" },
      { token: "250", label: "neutral.250" },
      { token: "300", label: "neutral.300" },
    ],
  },
  {
    title: "Brand",
    family: "brand",
    items: [
      { token: "1000", label: "brand.1000" },
      { token: "900", label: "brand.900" },
      { token: "800", label: "brand.800" },
      { token: "700", label: "brand.700" },
      { token: "600", label: "brand.600" },
      { token: "500", label: "brand.500" },
      { token: "400", label: "brand.400" },
      { token: "0", label: "brand.0" },
      { token: "50", label: "brand.50" },
      { token: "100", label: "brand.100" },
      { token: "150", label: "brand.150" },
      { token: "200", label: "brand.200" },
      { token: "250", label: "brand.250" },
      { token: "300", label: "brand.300" },
    ],
  },
  {
    title: "June",
    family: "june",
    items: [
      { token: "200", label: "june.200" },
      { token: "150", label: "june.150" },
      { token: "100", label: "june.100" },
      { token: "35", label: "june.35" },
      { token: "25", label: "june.25" },
      { token: "15", label: "june.15" },
    ],
  },
  {
    title: "Amber",
    family: "amber",
    items: [
      { token: "200", label: "amber.200" },
      { token: "150", label: "amber.150" },
      { token: "100", label: "amber.100" },
      { token: "35", label: "amber.35" },
      { token: "25", label: "amber.25" },
      { token: "15", label: "amber.15" },
    ],
  },
  {
    title: "Rose",
    family: "rose",
    items: [
      { token: "200", label: "rose.200" },
      { token: "150", label: "rose.150" },
      { token: "100", label: "rose.100" },
      { token: "35", label: "rose.35" },
      { token: "25", label: "rose.25" },
      { token: "15", label: "rose.15" },
    ],
  },
  {
    title: "Cyan",
    family: "cyan",
    items: [
      { token: "200", label: "cyan.200" },
      { token: "150", label: "cyan.150" },
      { token: "100", label: "cyan.100" },
      { token: "35", label: "cyan.35" },
      { token: "25", label: "cyan.25" },
      { token: "15", label: "cyan.15" },
    ],
  },
];

function Swatch({
  family,
  token,
  label,
}: {
  family: TokenSection["family"];
  token: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div
        className="h-[6.25rem] w-[12.5rem] rounded-[0.75rem] border"
        style={{
          background: `var(--primitive-colors-${family}-${token})`,
          borderColor,
        }}
      />
      <div className="rounded-[0.75rem] p-2.5">
        <p className="text-base leading-none font-medium text-black">{label}</p>
      </div>
    </div>
  );
}

export function TokenPreview() {
  return (
    <section className="flex min-h-dvh w-full flex-col items-start gap-6 bg-white p-6 text-black">
      <div className="flex flex-col items-start overflow-hidden p-2.5">
        <h1 className="text-[2.5rem] leading-none font-normal">Primitive tokens</h1>
      </div>

      {sections.map((section) => (
        <div key={section.title} className="flex w-full flex-col items-start gap-2.5">
          <div className="flex flex-col items-start overflow-hidden p-2.5">
            <h2 className="text-[2rem] leading-none font-normal">{section.title}</h2>
          </div>

          <div className="flex w-full flex-wrap items-center gap-2.5">
            {section.items.map((item) => (
              <Swatch
                key={`${section.family}-${item.token}`}
                family={section.family}
                token={item.token}
                label={item.label}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
