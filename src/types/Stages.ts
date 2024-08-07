export interface Stages {
  count: number;
  next: string;
  previous: any;
  page_size: number;
  results: ResultStages[];
}

export interface ResultStages {
  id: string;
  name: string;
  header_color: string;
  description: string;
  pipeline: string;
  order: number;
  created_at: string;
}
