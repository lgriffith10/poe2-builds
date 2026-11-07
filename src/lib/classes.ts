// Visual identity per class (no game art is used for class emblems).
export const CLASS_STYLE: Record<string, { color: string; glyph: string; attrs: string }> = {
  Warrior: { color: "#d0503f", glyph: "W", attrs: "Strength" },
  Mercenary: { color: "#d9873f", glyph: "Me", attrs: "Strength / Dexterity" },
  Ranger: { color: "#5fae54", glyph: "R", attrs: "Dexterity" },
  Huntress: { color: "#8bbd4a", glyph: "H", attrs: "Dexterity" },
  Monk: { color: "#4fb3a9", glyph: "Mo", attrs: "Dexterity / Intelligence" },
  Sorceress: { color: "#5b8ee0", glyph: "S", attrs: "Intelligence" },
  Witch: { color: "#9b6be0", glyph: "Wi", attrs: "Intelligence" },
  Druid: { color: "#c46aa0", glyph: "D", attrs: "Strength / Intelligence" },
};

export const classStyle = (name: string) => CLASS_STYLE[name] ?? { color: "#a39883", glyph: name[0], attrs: "" };
export const classSlug = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, "-");
