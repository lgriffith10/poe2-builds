import "server-only";
import gemsJson from "@/data/generated/gems.json";
import uniquesJson from "@/data/generated/uniques.json";
import basesJson from "@/data/generated/bases.json";
import metaJson from "@/data/generated/meta.json";
import treeJson from "../../public/data/tree.json";
import type { BaseItem, Gem, TreeData, UniqueItem } from "./types";

export const gems = gemsJson as Gem[];
export const uniques = uniquesJson as UniqueItem[];
export const bases = basesJson as BaseItem[];
export const tree = treeJson as unknown as TreeData;
export const meta = metaJson as { treeVersion: string; syncedAt: string };

const byName = <T extends { name: string }>(list: T[]) => new Map(list.map((x) => [x.name.toLowerCase(), x]));
const gemIndex = byName(gems);
const uniqueIndex = byName(uniques);
const baseIndex = byName(bases);

export const getGem = (name: string) => gemIndex.get(name.toLowerCase());
export const getUnique = (name: string) => uniqueIndex.get(name.toLowerCase());
export const getBase = (name: string) => baseIndex.get(name.toLowerCase());

export const classes = tree.classes;
export const getClass = (name: string) => classes.find((c) => c.name.toLowerCase() === name.toLowerCase());
