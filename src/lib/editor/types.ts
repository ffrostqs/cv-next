import type { Block } from "@/lib/blocks";

export type EditorLocale = string;

export interface EditorSection {
  id: string;
  title: string;
  blocks: Block[];
}

export interface EditorDocument {
  id: string;
  title: string;
  locale: EditorLocale;
  status: "draft" | "published" | "archived";
  sections: EditorSection[];
  updatedAt: string;
}
