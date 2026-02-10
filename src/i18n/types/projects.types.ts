export interface ProjectsDictionary {
  subtitle: string;
  title: string;
  description: string;
  filters: {
    all: string;
    showMore: string;
  };
  labels: {
    filteredBy: string;
    clear: string;
    viewCase: string;
    hideCase: string;
    problem: string;
    solution: string;
    result: string;
  };
  items: {
    id: number;
    category: string;
    meta: string;
    image: string;
    title: string;
    description: string;
    impact?: string[];
    problem: string;
    solution?: string;
    result?: string;
    tags: string[];
    stack: string[];
    links?: {
      label: string;
      url: string;
      icon: string;
    }[];
  }[];
}
