export interface ApiResponse<T> {
  total: number;
  data: T[];
}

export interface Attraction {
  id: number;
  name: string;
  name_zh: string | null;
  open_status: number;
  introduction: string;
  open_time: string;
  zipcode: string;
  distric: string;
  address: string;
  tel: string;
  fax: string;
  email: string;
  months: string;
  nlat: number;
  elong: number;
  official_site: string;
  facebook: string;
  ticket: string;
  remind: string;
  staytime: string;
  modified: string;
  url: string;
  category: Tag[];
  target: Tag[];
  service: Tag[];
  friendly: Tag[];
  images: Media[];
  files: Media[];
  links: Media[];
}

export interface Tag {
  id: number;
  name: string;
}

export interface Media {
  src: string;
  subject: string;
  ext: string;
}
