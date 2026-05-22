import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import {
  ChannelComboTextInputField,
  ClearableTextInputField,
  CommaMultiSelectField,
  CurrencyTextInputField,
  IconBothTextInputField,
  IconLeftTextInputField,
  IconRightTextInputField,
  PlainTextInputField,
  SearchTextInputField,
  TagMultiSelectField,
  TextAreaField,
  type ContactChannel,
} from "../../index";

const meta = {
  title: "Molecules/InputKit",
  tags: ["!autodocs"],
  parameters: { layout: "padded", controls: { disable: true } },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Presets: Story = {
  render: function Render() {
    const [plain, setPlain] = React.useState("Текст");
    const [clearable, setClearable] = React.useState("Очистить");
    const [money, setMoney] = React.useState("");
    const [search, setSearch] = React.useState("");
    const [channel, setChannel] = React.useState<ContactChannel>("telegram");
    const [contact, setContact] = React.useState("");
    const [multi, setMulti] = React.useState<string[]>(["a", "b"]);
    const [tags, setTags] = React.useState([
      { id: "1", label: "Alpha" },
      { id: "2", label: "Beta" },
      { id: "3", label: "Gamma" },
    ]);
    const [ta, setTa] = React.useState("");

    return (
      <div className="flex max-w-lg flex-col gap-8 p-4">
        <PlainTextInputField labelText="Plain" value={plain} onChange={(e) => setPlain(e.target.value)} />
        <IconLeftTextInputField labelText="Icon left" defaultValue="" placeholder="…" />
        <IconRightTextInputField labelText="Icon right" defaultValue="" />
        <IconBothTextInputField labelText="Icon both" defaultValue="" />
        <ClearableTextInputField
          labelText="Clear"
          value={clearable}
          onChange={(e) => setClearable(e.target.value)}
          onClear={() => setClearable("")}
        />
        <CurrencyTextInputField labelText="Currency" value={money} onChange={(e) => setMoney(e.target.value)} />
        <SearchTextInputField
          labelText="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearchIconClick={() => undefined}
        />
        <ChannelComboTextInputField
          labelText="Channel + validation"
          channel={channel}
          onChannelChange={setChannel}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <CommaMultiSelectField
          labelText="Comma multiselect"
          options={[
            { value: "a", label: "Alpha" },
            { value: "b", label: "Beta" },
            { value: "c", label: "Gamma" },
          ]}
          value={multi}
          onChange={setMulti}
          defaultMenuOpen
        />
        <TagMultiSelectField
          labelText="Tags + filter"
          tags={tags}
          onRemove={(id) => setTags((t) => t.filter((x) => x.id !== id))}
          filterInputProps={{ placeholder: "Фильтр…" }}
        />
        <TextAreaField labelText="TextArea" rows={4} value={ta} onChange={(e) => setTa(e.target.value)} />
      </div>
    );
  },
};
