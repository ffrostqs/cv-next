export interface LegalDictionary {
  title: string;
  updatedAt: string;

  sections: {
    id: string;
    title: string;
    paragraphs: string[];
    list?: string[];
  }[];
}
