export interface Contact {
  count: number;
  next: string;
  previous: any;
  page_size: number;
  results: ResultContact[];
}

export interface ResultContact {
  id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  nationality_code: string;
  country_code?: string;
  phone_number?: string;
  status: string;
  lost_reason?: string;
  lost_reason_comments: any;
  held_by: any;
  hold_expired_at: any;
  stage: string;
  assigned_to: string;
  source: any;
  created_at: string;
}
