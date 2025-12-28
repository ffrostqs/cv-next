export interface AboutDictionary {
  subtitle: string;
  title: string;
  description: string;

  stats?: {
    id: string;
    icon: string;
    value: string;
    label: string;
  }[];

  approach?: {
    title: string;
    items: {
      id: string;
      icon: string;
      title: string;
      description: string;
    }[];
  };
}
