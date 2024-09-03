export interface BenefitItemType {
  id: string;
  image: string;
  title: string;
  point: number;
  date_to: string;
  view_count: number;
  book_count: number;
  is_active: boolean;
}

export interface BenefitDetailType {
  image: string;
  contents: string;
  point: number;
  date_from: string;
  date_to: string;
  view_count: number;
  book_count: number;
  created: string;
  user: {
    profile: string;
    nickname: string;
  };
}
